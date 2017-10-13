var express = require('express')
var resolve = require('dat-link-resolve')
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
var encoding = require('dat-encoding')
var archiver = require('hypercore-archiver')
var swarm = require('hypercore-archiver/swarm')
var url = require('url')

module.exports = createRouter

function createRouter (config) {
  var router = express()
  router.use(bodyParser.json())
  var ar = archiver(path.resolve(process.cwd(), config.dir))
  var sw = swarm(ar)
  sw.on('listening', function () {
    console.log('listening')
  })

  function onerror (res, err) {
    res.statusCode = err.statusCode || 500
    res.end(JSON.stringify({error: true, message: err.message, statusCode: res.statusCode}))
  }

  router.get('/', function (req, res) {
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')).toString())
  })

  router.get('/dats', function (req, res) {
    ar.list(function (err, dats) {
      if (err) return onerror(res, err)
      res.send(dats.map((dat) => dat.toString('hex')))
    })
  })

  router.delete('/dats', function (req, res) {
    if (!req.body.key) return onerror(res, new Error('key required'))
    resolve(req.body.key, function (err, key) {
      if (err) return onerror(res, err)
      ar.remove(key, function (err) {
        if (err) return onerror(res, err)
        res.send('ok')
      })
    })
  })

  router.post('/dats', function (req, res) {
    if (!req.body.key) return onerror(res, new Error('key required'))
    resolve(req.body.key, function (err, key) {
      if (err) return onerror(res, err)
      key = encoding.encode(key)
      ar.add(key, function (err) {
        if (err) return onerror(res, err)
        res.send('ok')
      })
    })
  })

  return router
}
