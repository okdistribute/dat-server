var Dat = require('./dat.js')
// var through = require('through2')

var dat = Dat()

module.exports = function (server, stream) {
  return {
    status: function (cb) {
      cb(null, {
        dats: dat.status,
        swarm: {
          connections: dat.swarm.connections.length,
          connecting: dat.swarm.connecting
        }
      })
    },
    link: function (dir, cb) {
      dat.link(dir, cb)
    },
    join: function (link, dir, opts, cb) {
      dat.join(link, dir, opts, cb)
    },
    leave: function (id, cb) {
      dat.leave(id)
      cb()
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
