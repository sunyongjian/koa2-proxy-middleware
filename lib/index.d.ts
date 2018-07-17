import { Middleware } from 'koa';
import { Config } from 'http-proxy-middleware';

declare function Koa2ProxyMiddleware (options?: Koa2ProxyMiddleware.Koa2ProxyMiddlewareConfig): Middleware;

declare namespace Koa2ProxyMiddleware {
    type Koa2ProxyMiddlewareConfig = {
        targets: Record<string, Config>;
    };
}

export = Koa2ProxyMiddleware;
