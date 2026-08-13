import { createServer } from 'node:http';
import next from 'next';

// This file is the Node.js startup file Hostinger runs (hPanel -> Node.js app,
// "Startup file: server.js"). It is NOT compiled by Next, so it must be plain
// Node-compatible ESM — the project is "type": "module", hence import syntax.

// Hostinger's app runner does not guarantee NODE_ENV, and defaulting to dev
// would boot the compiler in production and serve nothing. Production is the
// default; development has to be asked for explicitly.
const dev = process.env.NODE_ENV === 'development';

// Hostinger injects the port the proxy forwards to. 3000 is only for running
// `npm start` locally after a build.
const port = Number.parseInt(process.env.PORT ?? '3000', 10);

// Bind all interfaces, not process.env.HOSTNAME — on shared hosting that
// variable holds the machine name (e.g. "srv1645"), which is not bindable.
const hostname = '0.0.0.0';

const app = next({ dev, hostname, port });
const handleRequest = app.getRequestHandler();

try {
    await app.prepare();
} catch (error) {
    console.error('Next.js failed to start:', error);
    // Exit non-zero so the process manager restarts instead of holding a port
    // open with no app behind it.
    process.exit(1);
}

const server = createServer((request, response) => {
    handleRequest(request, response).catch((error) => {
        console.error('Unhandled request error:', error);
        response.statusCode = 500;
        response.end('Internal Server Error');
    });
});

server.listen(port, hostname, () => {
    console.log(`Scripteeze ready on http://${hostname}:${port} (${dev ? 'development' : 'production'})`);
});

// Drain in-flight requests on restart so a redeploy cannot cut off a
// contact-form write part-way through appending to the CSV.
for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
        console.log(`${signal} received, shutting down.`);
        server.close(() => process.exit(0));
    });
}
