var Router = require('http-hash-router')
var fs = require('fs')
var json = require('body/json')
var path = require('path')
var Manager = require('dat-manager')
var url = require('url')

module.exports = createRouter

function createRouter (settings) {
  var router = Router()
  var manager = Manager(settings)

  router.set('/', function (req, res, opts, cb) {
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')).toString())
  })

  router.set('/api/settings', function (req, res, opts, cb) {
    if (req.method === 'POST') {
      json(req, function (err, data) {
        if (err) return cb(err)
        settings = data
        manager.settings(data)
        res.end('ok')
      })
    } else {
      res.end(JSON.stringify(settings))
    }
  })

  router.set('/dats', function (req, res, opts, cb) {
    if (req.method === 'GET') {
      manager.list(function (err, dats) {
        if (err) return cb(err)
        res.end(JSON.stringify({'dats': dats}))
      })
    }
    else res.end('Method not allowed.')
  })

  router.set('/dats/:key', function (req, res, opts, cb) {
    var key = decodeURIComponent(opts.params.key)
    if (req.method === 'GET') {
      manager.get(key, function (err, dat) {
        if (err) return cb(err)
        res.end(JSON.stringify(dat))
      })
    } else if (req.method === 'DELETE') {
      manager.delete(key, function (err) {
        if (err) return cb(err)
        res.end('ok')
      })
    } else if (req.method === 'PUT') {
      json(req, function (err, data) {
        if (err) return cb(err)
        manager.update(key, data, function (err) {
          if (err) return cb(err)
          res.end('ok')
        })
      })
    }
    else return cb(new Error('Method not allowed.'))
  })

  router.set('/dats/:key/start', function (req, res, opts, cb) {
    if (req.method !== 'GET') return cb(new Error('Method not allowed.'))
    var key = decodeURIComponent(opts.params.key)
    var link = url.parse(req.url, true).query.link
    manager.start(key, {link: link}, function (err, data) {
      if (err) return cb(err)
      res.end(JSON.stringify(data))
    })
  })

  router.set('/dats/:key/stop', function (req, res, opts, cb) {
    if (req.method !== 'GET') return cb(new Error('Method not allowed.'))
    var key = opts.params.key
    manager.stop(key, function (err, data) {
      if (err) return cb(err)
      res.end(JSON.stringify(data))
    })
  })

  return router
}
