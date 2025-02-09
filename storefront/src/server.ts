import { provideHttpClient } from '@angular/common/http';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import Medusa from '@medusajs/medusa-js';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Medusa API setup (using a separate function for async)
async function fetchAndSetCategories(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const medusaService =  new Medusa({
      baseUrl: 'http://localhost:9000',
      maxRetries: 3,
      publishableApiKey: 'pk_12bfbd5319d6deae9cb8ec3d27b9acc61349c2d79dc5a0f2fbf02106276e7794'
    })

    const categories = await medusaService.productCategories.list({ include_descendants_tree: true });
    res.locals['categories'] = categories;  // Make available in res.locals
    next(); // Continue to the Angular route handler
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.locals['categories'] = []; // Or handle error as needed
    next();
  }
}

app.get('*', fetchAndSetCategories, (req, res) => { // fetchAndSetCategories middleware
  res.render('index', { req, url: req.originalUrl });
});
/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
