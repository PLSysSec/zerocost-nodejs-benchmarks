'use strict'

const micro = require('micro')
const { router, get } = require('microrouter')

const hello = async function (req, res) {
  return micro.send(res, 200, { hello: 'world' })
}
const server = micro(
  router(
    get('/', hello)
  )
)
require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
server.listen(3000)
