'use strict'

const server = require('http').createServer(function (req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ hello: 'world' }))
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
server.listen(3000)
