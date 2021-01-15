'use strict'

const micro = require('micro')
const dispatch = require('micro-route/dispatch')

const handler = (req, res) => micro.send(res, 200, { hello: 'world' })

const server = micro(
  dispatch('/', 'GET', handler)
)
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
server.listen(3000)
