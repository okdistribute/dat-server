var http = require('http')
var Router = require('./router.js')
var router = Router()

module.exports = http.createServer(function (req, res) {
  router(req, res, {}, onError)

  function onError (err) {
    if (err) {
      res.statusCode = err.statusCode || 500
      res.end(JSON.stringify({error: true, message: err.message, statusCode: res.statusCode}))
    }
  }
})
