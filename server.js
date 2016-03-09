var http = require('http')
var st = require('st')
var Router = require('./router.js')
var fs = require('fs')
var path = require('path')

var settings = JSON.parse(fs.readFileSync(path.resolve('config.json')).toString())
var router = Router(settings)

module.exports = http.createServer(function (req, res) {
  if (st({ path: 'static/', url: 'static/' })(req, res)) return
  router(req, res, {}, onError)

  function onError (err) {
    if (err) {
      res.statusCode = err.statusCode || 500
      res.end(JSON.stringify({error: true, message: err.message, statusCode: res.statusCode}))
    }
  }
})
