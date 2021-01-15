'use strict'

const Koa = require('koa')

const app = new Koa()

app.use(async function (ctx) {
  ctx.body = { hello: 'world' }
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
app.listen(3000)
