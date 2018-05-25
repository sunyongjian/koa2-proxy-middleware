const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const pathToRegexp = require('path-to-regexp');

module.exports = (options) => {
  return async function (ctx, next) {
    const { targets = {} } = options;
    const { path } = ctx;
    for (const route of Object.keys(targets)) {
      if (pathToRegexp(route).test(path)) {
        await k2c(httpProxy(targets[route]))(ctx, next);
        break;
      }
    }
    await next();
  };
};
