var Dat = require('./dat.js')
var from = require('from2')

module.exports = function (server, stream) {
  var dat = Dat()
  return {
    status: function (cb) {
      // returns {
      //   '23i4jo2i34jo233i4j': {
      //     connected: 5,
      //     uploadRate: 23084,
      //   }
      // }
    },
    link: function (cb) {
      // return stream of import stats

    },
    join: function (link, dir, cb) {
      var progress = dat.join(link, dir)
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
