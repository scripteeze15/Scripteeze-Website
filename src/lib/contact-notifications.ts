import { mkdir, open, readdir, readFile, rmdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import nodemailer, { type Transporter } from 'nodemailer';
import { getNotificationOutboxDirectory } from './contact-submissions';

export interface ContactNotification {
    id: string;
    submittedAt: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

interface MailConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
    to: string;
}

interface QueuedNotification {
    version: 1;
    notification: ContactNotification;
}

// Hostinger's own SMTP. Only the password is a secret, so everything else has a
// working default and the deployment needs exactly one environment variable.
const DEFAULT_SMTP_HOST = 'smtp.hostinger.com';
const DEFAULT_SMTP_PORT = 465;
const DEFAULT_SMTP_USER = 'info@scripteeze.in';
const DEFAULT_MAIL_TO = 'scripteeze15@gmail.com';

// Bounded so a dead SMTP host cannot hold the contact form open indefinitely.
const TIMEOUT_MS = 10_000;
const MAX_DELIVERIES_PER_RUN = 10;

let transporter: Transporter | null = null;
let configWarningLogged = false;
let deliveryQueue: Promise<void> = Promise.resolve();

function mailConfig(): MailConfig | null {
    const host = process.env.SMTP_HOST?.trim() || DEFAULT_SMTP_HOST;
    const port = Number(process.env.SMTP_PORT?.trim() || DEFAULT_SMTP_PORT);
    const user = process.env.SMTP_USER?.trim() || DEFAULT_SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.MAIL_TO?.trim() || DEFAULT_MAIL_TO;
    // Hostinger only accepts a From address that matches the authenticated
    // mailbox, so this defaults to the SMTP user rather than the enquirer.
    const from = process.env.MAIL_FROM?.trim() || user;

    if (!host || !user || !pass || !to || !from) return null;
    if (!Number.isInteger(port) || port < 1 || port > 65535) return null;

    return { host, port, user, pass, from, to };
}

function getTransporter(config: MailConfig): Transporter {
    if (transporter) return transporter;

    transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        auth: { user: config.user, pass: config.pass },
        connectionTimeout: TIMEOUT_MS,
        greetingTimeout: TIMEOUT_MS,
        socketTimeout: TIMEOUT_MS,
    });

    return transporter;
}

function emailText(notification: ContactNotification): string {
    return [
        'New enquiry from the Scripteeze contact form.',
        '',
        `Reference: ${notification.id}`,
        `Time:      ${notification.submittedAt}`,
        `Name:      ${notification.name}`,
        `Email:     ${notification.email}`,
        `Phone:     ${notification.phone || 'Not provided'}`,
        `Service:   ${notification.service || 'Not specified'}`,
        '',
        'Message:',
        notification.message,
        '',
        'Reply directly to this email to reach the enquirer.',
        '',
    ].join('\n');
}

async function writeQueueFile(notification: ContactNotification): Promise<void> {
    const directory = getNotificationOutboxDirectory();
    await mkdir(directory, { recursive: true, mode: 0o700 });

    const file = await open(path.join(directory, `${notification.id}.json`), 'w', 0o600);
    try {
        const payload: QueuedNotification = { version: 1, notification };
        await file.writeFile(JSON.stringify(payload), 'utf8');
        // Flush before the request returns, so a crash cannot lose a
        // notification the enquirer was already told we received.
        await file.sync();
    } finally {
        await file.close();
    }
}

async function sendQueuedFile(filePath: string): Promise<boolean> {
    let queued: QueuedNotification;

    try {
        queued = JSON.parse(await readFile(filePath, 'utf8')) as QueuedNotification;
        if (queued.version !== 1 || !queued.notification?.id) throw new Error('Invalid queue record.');
    } catch (error) {
        console.error('[contact-mail] Discarding unreadable queue record:', error);
        await unlink(filePath).catch(() => undefined);
        return false;
    }

    const config = mailConfig();
    if (!config) {
        if (!configWarningLogged) {
            console.warn('[contact-mail] SMTP_PASS is not set; notifications stay queued until it is.');
            configWarningLogged = true;
        }
        return false;
    }

    const { notification } = queued;

    try {
        await getTransporter(config).sendMail({
            from: config.from,
            to: config.to,
            replyTo: notification.email,
            subject: `New enquiry: ${notification.service || 'General'} — ${notification.name}`.replace(/[\r\n]/g, ' '),
            text: emailText(notification),
            headers: { 'X-Scripteeze-Submission': notification.id },
        });

        await unlink(filePath);
        return true;
    } catch (error) {
        // Drop the cached connection so the next attempt reconnects instead of
        // reusing a socket the server already gave up on. The file stays put.
        transporter = null;
        console.error('[contact-mail] Delivery failed; notification remains queued:', error);
        return false;
    }
}

/**
 * Record the notification on disk before any SMTP work begins, so a temporary
 * mail outage cannot discard an enquiry that was already saved.
 */
export async function queueContactNotification(notification: ContactNotification): Promise<void> {
    await writeQueueFile(notification);
}

async function deliverPendingNotifications(): Promise<void> {
    const directory = getNotificationOutboxDirectory();
    let entries: string[];

    try {
        entries = await readdir(directory);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
        console.error('[contact-mail] Could not read the notification outbox:', error);
        return;
    }

    const pending = entries.filter((entry) => entry.endsWith('.json')).sort().slice(0, MAX_DELIVERIES_PER_RUN);

    for (const name of pending) {
        // Stop at the first failure: if SMTP is down, the rest will fail too and
        // each one would cost another connection timeout.
        if (!await sendQueuedFile(path.join(directory, name))) return;
    }

    try {
        if ((await readdir(directory)).length === 0) await rmdir(directory);
    } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code !== 'ENOENT' && code !== 'ENOTEMPTY') {
            console.error('[contact-mail] Could not remove the drained outbox:', error);
        }
    }
}

/**
 * Attempt delivery of queued notifications, one run at a time. Retried on every
 * later submission, so a queue built up during an outage drains by itself.
 */
export function deliverQueuedNotifications(): Promise<void> {
    const run = deliveryQueue.then(deliverPendingNotifications, deliverPendingNotifications);
    deliveryQueue = run.then(() => undefined, () => undefined);
    return run;
}
