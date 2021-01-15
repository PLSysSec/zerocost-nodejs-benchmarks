'use strict'

const http = require('http')

const { adapter } = require('spirit').node
const route = require('spirit-router')

const hello = () => {
  return { hello: 'world' }
}

const app = route.define([
  route.get('/', hello)
])
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
http.createServer(adapter(app)).listen(3000)
