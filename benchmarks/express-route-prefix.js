'use strict'

const express = require('express')

const app = express()

app.disable('etag')
app.disable('x-powered-by')

const router = express.Router()

router.get('/hello', function (req, res) {
  res.json({ hello: 'world' })
})
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
app.use('/greet', router)
app.listen(3000)
