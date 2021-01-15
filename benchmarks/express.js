'use strict'

const express = require('express')

const app = express()

app.disable('etag')
app.disable('x-powered-by')

app.get('/', function (req, res) {
  res.json({ hello: 'world' })
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
app.listen(3000)
