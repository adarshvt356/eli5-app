import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { config } from 'dotenv';
import { pathToFileURL } from 'url';
import path from 'path';

// Load .env.local so the API handler can read GROQ_API_KEY during dev
config({ path: '.env.local' });

/**
 * Vite plugin that serves the Vercel-style api/explain.js handler locally.
 * This means `npm run dev` works without needing `vercel dev` or a separate
 * Express server — the same handler file is used in both environments.
 */
function apiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/explain', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        let rawBody = '';
        req.on('data', (chunk) => { rawBody += chunk; });
        req.on('end', async () => {
          try {
            const body = rawBody ? JSON.parse(rawBody) : {};

            // Cache-bust the import so handler changes reflect without restarting
            const handlerUrl = pathToFileURL(
              path.join(process.cwd(), 'api/explain.js')
            ).href + '?t=' + Date.now();

            const { default: handler } = await import(handlerUrl);

            // Minimal req/res shim matching Vercel's handler signature
            req.body = body;
            const mockRes = {
              _status: 200,
              status(code) { this._status = code; return this; },
              json(data) {
                res.statusCode = this._status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
            };

            await handler(req, mockRes);
          } catch (err) {
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiPlugin(),
  ],
});