var client = require('./client.js')

module.exports = Dat

function Dat () {
  if (!(this instanceof Dat)) return new Dat()
}

Dat.prototype.join = function (link, dir, opts, cb) {
  if ((typeof opts) === 'function') return this.join(link, dir, {}, opts)
  if (!opts) opts = {}
  if (!cb) cb = function noop () {}
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
  client(function (err, rpc, conn) {
    if (err) return cb(err)
    rpc.link(dir, function (err, link) {
      if (err) return cb(err)
      conn.destroy()
      cb(null, link)
    })
  })
}

Dat.prototype.status = function (cb) {
  client(function (err, rpc, conn) {
    if (err) return cb(err)
    rpc.status(function (err, status) {
      if (err) return cb(err)
      conn.destroy()
      cb(null, status)
    })
  })
}

Dat.prototype.leave = function (dir, cb) {
  client(function (err, rpc, conn) {
    if (err) throw err
    rpc.leave(dir)
    conn.destroy()
    cb()
  })
}

Dat.prototype.close = function (cb) {
  client(function (err, rpc, conn) {
    if (err) return cb(err)
    rpc.close(function (err, status) {
      if (err) return cb(err)
      conn.destroy()
      cb()
    })
  })
}
