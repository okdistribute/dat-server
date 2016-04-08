var dat = require('./')()
var from = require('from2')

module.exports = function (server, stream) {
  return {
    join: function (link, dir) {
      var progress = dat.join(link, dir)
      var progressStream = from.obj()
      progress.on('stats', function () {
        progressStream.write(progress.stats)
      })
      return progressStream
    },
    leave: function (id) {
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
