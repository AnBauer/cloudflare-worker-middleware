// noinspection JSUnusedGlobalSymbols

import {Middleware} from "./types";

const registeredRouteHandlers: Middleware[] = [];
const routeNotFoundError: Middleware = {
  routePattern: new RegExp('(.)'),
  routeHandler: () => Promise.resolve(new Response('Route not found', { status: 400 })),
};

export function registerRoute(routePattern: RegExp, routeHandler: (event: FetchEvent) => Promise<Response>): void {
  registeredRouteHandlers.push({routePattern, routeHandler});
}

export function registerRouteNotFoundHandler(handler: Middleware["routeHandler"]): void {
  routeNotFoundError.routeHandler = handler
}

export function registerFetchEventListener(middlewareBasePath?: string): void {
  addEventListener('fetch', (event: FetchEvent) => {
    const endPoint = new URL(event.request.url).pathname.replace(`/${middlewareBasePath}/`, '');
    const route = registeredRouteHandlers.find(mw => endPoint.match(mw.routePattern)) || routeNotFoundError
    event.respondWith(route.routeHandler(event))
  })
}
