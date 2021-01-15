'use strict'

const express = require('express')

const app = express()

app.disable('etag')
app.disable('x-powered-by')

app.use(require('cors')())
app.use(require('dns-prefetch-control')())
app.use(require('frameguard')())
app.use(require('hide-powered-by')())
app.use(require('hsts')())
app.use(require('ienoopen')())
app.use(require('x-xss-protection')())

app.get('/', function (req, res) {
  res.json({ hello: 'world' })
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
app.listen(3000)
