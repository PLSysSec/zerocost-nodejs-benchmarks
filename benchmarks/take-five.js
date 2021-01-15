'use strict'

const five = require('take-five')

const server = five()
server.get('/', function (req, res) {
  return res.send({ hello: 'world' })
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
server.listen(3000)
