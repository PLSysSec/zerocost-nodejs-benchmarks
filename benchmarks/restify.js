'use strict'

const restify = require('restify')

const server = restify.createServer()
server.get('/', function (req, res) {
  res.send({ hello: 'world' })
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
server.listen(3000)
