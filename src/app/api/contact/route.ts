import { appendContactSubmission, validateContactSubmission } from '../../../lib/contact-submissions';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_REQUEST_BYTES = 25_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

interface RateLimitBucket {
    count: number;
    resetAt: number;
}

const rateLimitBuckets = new Map<string, RateLimitBucket>();

function jsonResponse(body: object, status: number): Response {
    return Response.json(body, {
        status,
        headers: {
            'Cache-Control': 'no-store',
        },
    });
}

function getClientKey(request: Request): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')?.trim()
        || 'unknown';
}

function isRateLimited(clientKey: string): boolean {
    const now = Date.now();
    const bucket = rateLimitBuckets.get(clientKey);

    if (!bucket || bucket.resetAt <= now) {
        rateLimitBuckets.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    bucket.count += 1;

    if (rateLimitBuckets.size > 500) {
        for (const [key, value] of rateLimitBuckets) {
            if (value.resetAt <= now) rateLimitBuckets.delete(key);
        }
    }

    return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function hasValidOrigin(request: Request): boolean {
    const origin = request.headers.get('origin');
    if (!origin) return true;

    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const requestHost = forwardedHost || request.headers.get('host');
    if (!requestHost) return false;

    try {
        return new URL(origin).host === requestHost;
    } catch {
        return false;
    }
}

export async function POST(request: Request): Promise<Response> {
    if (!hasValidOrigin(request)) {
        return jsonResponse({ success: false, message: 'Invalid request origin.' }, 403);
    }

    if (isRateLimited(getClientKey(request))) {
        return jsonResponse(
            { success: false, message: 'Too many enquiries. Please wait a few minutes and try again.' },
            429,
        );
    }

    const declaredLength = Number(request.headers.get('content-length') || '0');
    if (declaredLength > MAX_REQUEST_BYTES) {
        return jsonResponse({ success: false, message: 'Submission is too large.' }, 413);
    }

    try {
        const rawBody = await request.text();
        if (rawBody.length > MAX_REQUEST_BYTES) {
            return jsonResponse({ success: false, message: 'Submission is too large.' }, 413);
        }

        const payload: unknown = JSON.parse(rawBody);
        const { data, errors } = validateContactSubmission(payload);

        if (!data) {
            return jsonResponse(
                { success: false, message: 'Please correct the highlighted fields.', fieldErrors: errors },
                400,
            );
        }

        // Honeypot: pretend the request succeeded so simple bots do not adapt.
        if (data.website) {
            return jsonResponse({ success: true, message: 'Your enquiry has been received.' }, 200);
        }

        const saved = await appendContactSubmission(data);

        return jsonResponse(
            {
                success: true,
                message: 'Thank you! Your enquiry has been received. We will get back to you within 24 hours.',
                submissionId: saved.id,
            },
            201,
        );
    } catch (error) {
        if (error instanceof SyntaxError) {
            return jsonResponse({ success: false, message: 'Invalid request body.' }, 400);
        }

        console.error('Unable to save contact submission:', error);
        return jsonResponse(
            { success: false, message: 'We could not save your enquiry. Please email info@scripteeze.in.' },
            500,
        );
    }
}
