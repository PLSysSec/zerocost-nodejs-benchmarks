'use strict'

const micro = require('micro')

const server = micro(async function (req, res) {
  return { hello: 'world' }
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
server.listen(3000)
