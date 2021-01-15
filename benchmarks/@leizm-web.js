'use strict'

const Connect = require('@leizm/web').Connect

const app = new Connect()

app.use('/', function (ctx) {
  ctx.response.json({ hello: 'world' })
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
app.listen(3000)
