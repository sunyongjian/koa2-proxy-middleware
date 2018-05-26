## Introduction
A koa2 middleware 依赖于 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware).

## Install

`$ npm install --save-dev koa2-proxy-middleware`

## Usage
用法非常简单，如果你对 http-proxy-middleware 和 path-to-regexp 的用法比较熟悉的话。


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
targets 的每个 key 是你需要代理的路由，它会通过 path-to-regexp 转化为正则，去对请求的 path 做验证。用代码表示：
```js

const regexp = pathToRegexp('/route-key');
regexp.test(ctx.req.path);

```

不过 path-to-regexp 的后两个参数被省略了。有需求 pr 和 issue

#### option
跟 http-proxy-middleware 的一样，匹配到某个路由就使用这个配置。


### Tips
Bodyparser 需要放到 proxy-middleware 后面 `app.use`，当请求为 POST 的时候，否则将会出现延迟，无法响应的问题。感觉这是 bodyparser 的一个 bug...
