import { timingSafeEqual } from 'node:crypto';
import { readSubmissionsCsv } from '../../../../lib/contact-submissions';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function tokensMatch(provided: string, expected: string): boolean {
    const providedBuffer = Buffer.from(provided);
    const expectedBuffer = Buffer.from(expected);

    return providedBuffer.length === expectedBuffer.length
        && timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function GET(request: Request): Promise<Response> {
    const configuredToken = process.env.CONTACT_EXPORT_TOKEN?.trim() || '';
    if (configuredToken.length < 24) {
        console.error('CONTACT_EXPORT_TOKEN is missing or shorter than 24 characters.');
        return Response.json(
            { success: false, message: 'CSV export is not configured.' },
            { status: 503, headers: { 'Cache-Control': 'no-store' } },
        );
    }

    const authorization = request.headers.get('authorization') || '';
    const providedToken = authorization.startsWith('Bearer ')
        ? authorization.slice('Bearer '.length).trim()
        : '';

    if (!tokensMatch(providedToken, configuredToken)) {
        return Response.json(
            { success: false, message: 'Unauthorized.' },
            {
                status: 401,
                headers: {
                    'Cache-Control': 'no-store',
                    'WWW-Authenticate': 'Bearer',
                },
            },
        );
    }

    try {
        const csv = await readSubmissionsCsv();
        const date = new Date().toISOString().slice(0, 10);

        return new Response(csv, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
                'Content-Disposition': `attachment; filename="scripteeze-submissions-${date}.csv"`,
                'Content-Type': 'text/csv; charset=utf-8',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch (error) {
        console.error('Unable to export contact submissions:', error);
        return Response.json(
            { success: false, message: 'Unable to export submissions.' },
            { status: 500, headers: { 'Cache-Control': 'no-store' } },
        );
    }
}
