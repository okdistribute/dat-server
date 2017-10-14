var parallel = require('run-parallel')
var index = require('./index.js')
var express = require('express')
var resolve = require('dat-link-resolve')
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
var encoding = require('dat-encoding')
var archiver = require('hyperdrive-archiver')
var url = require('url')

module.exports = createRouter

function createRouter (config) {
  var router = express()
  router.use(bodyParser.json())
  var ar = archiver(config)
  ar.swarm.on('listening', function () {
    console.log('listening')
  })

  function onerror (res, err) {
    res.statusCode = err.statusCode || 500
    res.end(JSON.stringify({error: true, message: err.message, statusCode: res.statusCode}))
  }

  router.get('/', function (req, res) {
    res.end(index(config))
  })

  router.get('/health/:key', function (req, res) {
    ar.get(req.params.key, function (err, archive) {
      res.send(ar.health(archive))
    })
  })

  router.get('/dats', function (req, res) {
    ar.list(function (err, keys) {
      if (err) return onerror(res, err)
      var dats = []
      var tasks = []
      keys.forEach((key) => tasks.push((done) => {
        ar.get(key, function (err, archive) {
          if (err) return done(err)
          dats.push({
            key: key.toString('hex'),
            health: ar.health(archive)
          })
          done()
        })
      }))
      parallel(tasks, function (err) {
        if (err) return onerror(res, err)
        res.send(dats)
      })
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
