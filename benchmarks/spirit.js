'use strict'

const http = require('http')

const { adapter, response } = require('spirit').node

const app = (req) => {
  return response({ hello: 'world' }).type('json')
}
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
http.createServer(adapter(app)).listen(3000)
