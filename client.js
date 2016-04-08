var autod = require('auto-daemon')
var extend = require('xtend')
var path = require('path')
var os = require('os')

var autodOpts = {
  rpcfile: path.join(__dirname, 'server.js'),
  sockfile: path.join(os.tmpdir(), 'datserver.sock'),
  methods: [ 'join:s', 'leave', 'close' ]
}

module.exports = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  autod(extend(autodOpts, opts), cb)
}
