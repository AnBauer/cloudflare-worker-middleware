export interface Middleware {
  routePattern: RegExp;
  routeHandler: (event: FetchEvent) => Promise<Response>
}