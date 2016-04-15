var Dat = require('./dat.js')
// var through = require('through2')

var dat = Dat()

module.exports = function (server, stream) {
  return {
    status: function (cb) {
      cb(null, dat.status)
    },
    link: function (dirs, cb) {
      dat.link(dirs, cb)
    },
    join: function (link, dir, opts, cb) {
      dat.join(link, dir, opts, cb)
    },
    leave: function (id, cb) {
      dat.leave(id)
    },
    close: function (cb) {
      dat.close(function () {
        server.close()
        cb()
        stream.destroy()
      })
    }
  }
}
