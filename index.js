var client = require('./client.js')

module.exports = Dat

function Dat () {

}

Dat.prototype.join = function (link, dir, cb) {
  client(function (err, rpc, conn) {
    if (err) return cb(err)
    rpc.join(link, dir, function (err) {
      if (err) return cb(err)
      conn.destroy()
      cb()
    })
  })
}

Dat.prototype.link = function (dir, cb) {

}

Dat.prototype.status = function (cb) {
}

Dat.prototype.leave = function (link) {

}

Dat.prototype.close = function () {

}
