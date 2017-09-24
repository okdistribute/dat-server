var http = require('http')
var st = require('st')
var Router = require('./router.js')
var fs = require('fs')
var path = require('path')

var config = JSON.parse(fs.readFileSync(path.resolve('config.json')).toString())
var router = Router(config)

module.exports = http.createServer(function (req, res) {
  if (st({ path: 'static/', url: 'static/' })(req, res)) return
  router(req, res)
})
