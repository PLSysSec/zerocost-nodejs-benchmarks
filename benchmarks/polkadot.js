'use strict'

const polkadot = require('polkadot')
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
polkadot(function (req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ hello: 'world' }))
}).listen(3000)
