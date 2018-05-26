## Introduction
A koa2 middleware by means of [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).

[中文](https://github.com/sunyongjian/koa2-proxy-middleware/blob/master/README_CN.md)
## Install

`$ npm install --save-dev koa2-proxy-middleware`

## Usage
This is a very simple usage.
If you are familiar with the use of http-proxy-middleware and [path-to-regexp](https://github.com/pillarjs/path-to-regexp).


### Example
```js
const Koa = require('koa');
const proxy = require('koa2-proxy-middleware');
const bodyparser = require('koa-bodyparser');

const app = new Koa();

const options = {
  targets: {
    '/user': {
      // this is option of http-proxy-middleware
      target: 'http://localhost:3000', // target host
      changeOrigin: true, // needed for virtual hosted sites
    },
    '/user/:id': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
    // (.*) means anything
    '/api/(.*)': {
      target: 'http://10.94.123.123:1234',
      changeOrigin: true,
      pathRewrite: {
        '/passager/xx': '/mPassenger/ee', // rewrite path
      }
    },
  }
}

app.use(proxy(options));


app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
```



### options
```js
{
  targets: {
    [key]: [option],
  },
}
```
#### key
The key route that you need to proxy.And through path-to-regexp into regexp. 
This is mean:
```js
const regexp = pathToRegexp('route-key');
regexp.test(ctx.req.path);
```
#### option
The option corresponding to key and like http-proxy-middleware.


### Tips
Bodyparser need to after proxy-middleware when request method is POST. Otherwise there will be a delay. I think this is a bug of bodyparser.
