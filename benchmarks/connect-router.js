'use strict'

const connect = require('connect')
const router = require('router')()

const app = connect()
router.get('/', function (req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ hello: 'world' }))
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
app.use(router)
app.listen(3000)
