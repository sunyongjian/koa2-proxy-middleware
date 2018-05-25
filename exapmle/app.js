const Koa = require('koa');
const proxy = require('../lib/index');
const bodyparser = require('koa-bodyparser');

const app = new Koa();

const options = {
  targets: {
    '/user': {
      // this is option of http-proxy-middleware
      target: 'http://localhost:3001', // target host
      changeOrigin: true, // needed for virtual hosted sites
    },
    '/user/:id': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
    '/api/*': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {
        '/passager/xx': '/mPassenger/ee', // rewrite path
      }
    },
  }
}

app.use(proxy(options));


app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

app.listen(3000, () => console.log(3000));