'use strict'

const app = require('vapr')()

app.get('/', () => [
  200,
  { 'content-type': 'application/json' },
  [JSON.stringify({ hello: 'world' })]
])
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
require('http').createServer(app).listen(3000)
