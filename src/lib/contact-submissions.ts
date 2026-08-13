import { randomUUID } from 'node:crypto';
import { appendFile, mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

export const CONTACT_SERVICES = [
    'Social Media Management',
    'Video Editing',
    'Script Writing',
    'Content Ideation',
    'Voice Acting',
    'Thumbnail Design',
    'Complete Package',
    'Other',
] as const;

const CSV_HEADER = '\uFEFFid,submitted_at,name,email,phone,service,message\n';

export interface ContactSubmissionInput {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    website?: string;
}

export interface ContactFieldErrors {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
}

interface ValidationResult {
    data?: ContactSubmissionInput;
    errors: ContactFieldErrors;
}

let writeQueue: Promise<void> = Promise.resolve();

const removeControlCharacters = (value: string, preserveWhitespace: boolean): string => {
    return Array.from(value, (character) => {
        const code = character.charCodeAt(0);
        const isAllowedWhitespace = preserveWhitespace && (code === 9 || code === 10);
        return (code < 32 || code === 127) && !isAllowedWhitespace ? (preserveWhitespace ? '' : ' ') : character;
    }).join('');
};

const normalizeSingleLine = (value: unknown, maxLength: number): string => {
    if (typeof value !== 'string') return '';

    return removeControlCharacters(value, false)
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, maxLength);
};

const normalizeMessage = (value: unknown): string => {
    if (typeof value !== 'string') return '';

    return removeControlCharacters(value.replace(/\r\n?/g, '\n'), true)
        .trim()
        .slice(0, 5000);
};

export function validateContactSubmission(value: unknown): ValidationResult {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return { errors: { message: 'Invalid submission.' } };
    }

    const input = value as Record<string, unknown>;
    const data: ContactSubmissionInput = {
        name: normalizeSingleLine(input.name, 100),
        email: normalizeSingleLine(input.email, 254).toLowerCase(),
        phone: normalizeSingleLine(input.phone, 30),
        service: normalizeSingleLine(input.service, 80),
        message: normalizeMessage(input.message),
        website: normalizeSingleLine(input.website, 200),
    };
    const errors: ContactFieldErrors = {};

    if (data.name.length < 2) {
        errors.name = 'Please enter your name.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (data.phone && !/^[0-9+()\-\s]{7,30}$/.test(data.phone)) {
        errors.phone = 'Please enter a valid phone number.';
    }

    if (data.service && !CONTACT_SERVICES.includes(data.service as (typeof CONTACT_SERVICES)[number])) {
        errors.service = 'Please select a valid service.';
    }

    if (data.message.length < 10) {
        errors.message = 'Message must be at least 10 characters.';
    }

    return Object.keys(errors).length > 0 ? { errors } : { data, errors };
}

function protectSpreadsheetCell(value: string): string {
    return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function csvCell(value: string): string {
    return `"${protectSpreadsheetCell(value).replace(/"/g, '""')}"`;
}

// Hostinger rebuilds the app into a disposable `hbuilds` tree on every deploy,
// so anything written inside the application directory is destroyed with it.
// The account home is spelled out rather than read from os.homedir() because
// Hostinger's build and runtime processes can resolve different HOME values and
// would then read and write two different CSVs.
const HOSTINGER_ACCOUNT_HOME = '/home/u376055756';
const SUBMISSIONS_DIRECTORY_NAME = 'scripteeze-submissions';

function assertDurableProductionDirectory(rawValue: string, resolved: string): void {
    if (process.env.NODE_ENV !== 'production' || process.platform === 'win32') return;

    // A relative value is the mistake this is really guarding against: it
    // resolves against the application folder, which the next deploy discards.
    // `hbuilds` and `public_html` are Hostinger's own disposable trees.
    const segments = resolved.split(path.sep);
    const isDisposable = !path.isAbsolute(rawValue)
        || segments.includes('hbuilds')
        || segments.includes('public_html');

    if (isDisposable) {
        throw new Error(
            `Refusing to store submissions in ${resolved}: Hostinger replaces this directory on every `
            + 'deploy. Point CONTACT_DATA_DIR at an absolute path outside the application folder.',
        );
    }
}

export function getContactDataDirectory(): string {
    const configuredDirectory = process.env.CONTACT_DATA_DIR?.trim();

    if (configuredDirectory) {
        const resolved = path.resolve(configuredDirectory);
        assertDurableProductionDirectory(configuredDirectory, resolved);
        return resolved;
    }

    // Durable by default in production, so a missing env var cannot quietly cost
    // us a deploy's worth of enquiries.
    if (process.env.NODE_ENV === 'production' && process.platform !== 'win32') {
        return path.join(HOSTINGER_ACCOUNT_HOME, SUBMISSIONS_DIRECTORY_NAME);
    }

    return path.join(process.cwd(), 'server');
}

export function getSubmissionsCsvPath(): string {
    return path.join(getContactDataDirectory(), 'submissions.csv');
}

// Pending email notifications sit beside the CSV so they inherit the same
// durable location. A queued notification has to survive a deploy for the same
// reason the enquiry does.
export function getNotificationOutboxDirectory(): string {
    return path.join(getContactDataDirectory(), '.contact-outbox');
}

export async function appendContactSubmission(data: ContactSubmissionInput): Promise<{ id: string; submittedAt: string }> {
    const id = randomUUID();
    const submittedAt = new Date().toISOString();
    const row = [
        id,
        submittedAt,
        data.name,
        data.email,
        data.phone || 'Not provided',
        data.service || 'Not specified',
        data.message,
    ].map(csvCell).join(',') + '\n';

    const write = async () => {
        const dataDirectory = getContactDataDirectory();
        const csvPath = getSubmissionsCsvPath();
        await mkdir(dataDirectory, { recursive: true });

        let needsHeader = false;
        try {
            needsHeader = (await stat(csvPath)).size === 0;
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
            needsHeader = true;
        }

        await appendFile(csvPath, `${needsHeader ? CSV_HEADER : ''}${row}`, {
            encoding: 'utf8',
            flag: 'a',
        });
    };

    const queuedWrite = writeQueue.then(write, write);
    writeQueue = queuedWrite.then(() => undefined, () => undefined);
    await queuedWrite;

    return { id, submittedAt };
}

export async function readSubmissionsCsv(): Promise<string> {
    try {
        return await readFile(getSubmissionsCsvPath(), 'utf8');
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return CSV_HEADER;
        throw error;
    }
}
