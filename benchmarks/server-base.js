require('events').EventEmitter.defaultMaxListeners = 100;
process.setMaxListeners(0);
require('server-base')({
  '@setup' (ctx) {
    ctx.middlewareFunctions = []
  },
  '/': {
    get (req, res) {
      res.setHeader('content-type', 'application/json; charset=utf-8')
      res.json({ hello: 'world' })
    }
  }
}).start(3000)
