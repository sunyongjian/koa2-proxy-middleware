const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();


const app = new Koa();

router.get('/user', async (ctx) => {
  ctx.body = {
    data: {
      user: 1
    }
  }
})


router.get('/user/:id', async (ctx) => {
  ctx.body = {
    data: {
      user: ctx.params.id || 11,
    }
  }
})

app.use(router.routes());
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

app.listen(3001, () => console.log(3001));