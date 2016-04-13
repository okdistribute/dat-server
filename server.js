var Dat = require('./dat.js')
// var through = require('through2')

module.exports = function (server, stream) {
  var dat = Dat()
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
