# Cloudflare worker middleware 

A simple helper create awesome worker middlewares but only deploying ONE worker to cloudflare  

## 🔋 Getting Started

The easiest way to get started is using [Wrangler](https://github.com/cloudflare/wrangler) (Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/)).
Once you have wrangler, create your base for a worker middleware with this typescript template:
```bash
wrangler generate my-ts-worker-middleware https://github.com/cloudflare/worker-typescript-template
```
In the generated project, add the middleware helper:

```bash
npm i cloudflare-worker-middleware
```

### 👩 💻 Developing
To start adding routes and corresponding handlers to your middleware, go to your [`src/index.ts`](./src/index.ts) and 
import the provided functions:
```typescript
import {registerRoute, registerRouteNotFoundHandler, registerFetchEventListener} from 'cloudflare-worker-middleware';
```

#### Registering routes
```typescript
registerRoute(/awesome-test-route/, () => Promise.resolve(new Response('boom, baby!')));
```
Attention: `registerRoute` expects a regular expression, so make sure to be as precise as necessary and do NOT include the base path! 

#### Add a custom route not found handler
The assumption is, that a middleware has a base path like `api` or something like that so that the worker can be deployed
to cloudflare and registered for all routes that start with api: `api/*`. For all unhandled routes a 404 will be returned.
If you want a custom response, you can register it via 
```typescript
registerRouteNotFoundHandler(() => Promise.resolve(new Response('End of the internet', {status: 404})));
```

### Activation your middleware
In order to use your middleware, you need to let `cloudflare-worker-middleware` handle all requests for a specific base path
```Typescript
registerFetchEventListener('api')
```