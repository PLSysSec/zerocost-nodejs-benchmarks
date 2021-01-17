'use strict'

const autocannon = require('autocannon')
const fs = require('fs')
const compare = require('autocannon-compare')
const path = require('path')
const process = require('process')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const access = promisify(fs.access)

const resultsDirectory = path.join(process.cwd(), 'results')

const run = (opts = {}) => new Promise((resolve, reject) => {
  opts.url = 'http://localhost:3000'
  opts.headers = [
    "XYZGET /home.html HTTP/1.1",
    "XYZHost: developer.mozilla.org",
    "XYZUpgrade-Insecure-Requests: 1",
    "XYZIf-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT",
    "XYZIf-None-Match: c561c68d0ba92bbeb8b0fff2a9199f722e3a621a",
    "XYZCache-Control: max-age=0",
    "XYZSEC-FETCH-USER: 1",
    "XYZUser-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0",
    "XYZAccept: /",
    "XYZAccept-Language: en-US,en;q=0.5",
    "XYZAccept-Encoding: gzip, deflate, br",
    "XYZReferer: WHAT",
    "XYZAuthorization: SAPISIDHASH 1610837324_92ce91c28a662a73f17176de2ca7b1421935d916",
    "XYZX-Origin: https://mail.google.com",
    "XYZX-Goog-AuthUser: 0",
    "XYZContent-Type: application/x-www-form-urlencoded",
    "XYZContent-Length: 7",
    "XYZOrigin: https://0.client-channel.google.com",
    "XYZDNT: 1",
    "XYZConnection: keep-alive",
    "XYZCookie: WHAT",
    "XYZSec-Fetch-Dest: empty",
    "XYZSec-Fetch-Mode: cors",
    "XYZSec-Fetch-Site: same-origin",
    "XYZSec-GPC: 1",
    "XYZTE: Trailers"
  ]
  autocannon(opts, (err, result) => {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  })
})

const writeResult = async (handler, result) => {
  try {
    await access(resultsDirectory)
  } catch (e) {
    await mkdir(resultsDirectory)
  }

  result.server = handler
  result.nodeInfo = {
    execPath: process.execPath,
    release: process.release
  };

  const dest = path.join(resultsDirectory, `${handler}.json`)
  return writeFile(dest, JSON.stringify(result))
}

module.exports.fire = async (opts, handler, save) => {
  const result = await run(opts)
  return save ? writeResult(handler, result) : null
}

module.exports.compare = (a, b) => {
  const resA = require(`${resultsDirectory}/${a}.json`)
  const resB = require(`${resultsDirectory}/${b}.json`)
  const comp = compare(resA, resB)
  if (comp.equal) {
    return true
  } else if (comp.aWins) {
    return {
      diff: comp.requests.difference,
      fastest: a,
      slowest: b,
      fastestAverage: resA.requests.average,
      slowestAverage: resB.requests.average
    }
  }
  return {
    diff: compare(resB, resA).requests.difference,
    fastest: b,
    slowest: a,
    fastestAverage: resB.requests.average,
    slowestAverage: resA.requests.average
  }
}
