var autod = require('auto-daemon')
var extend = require('xtend')
var path = require('path')
var os = require('os')

var dir = os.tmpdir()

var sockPath = process.platform === 'win32'
    ? '\\\\.\\pipe\\datserver\\' + dir
    : path.join(dir, 'datserver.sock')

var autodOpts = {
  rpcfile: path.join(__dirname, 'server.js'),
  sockfile: sockPath,
  methods: [ 'status', 'link', 'join', 'leave', 'close' ]
}

module.exports = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  autod(extend(autodOpts, opts), cb)
}
