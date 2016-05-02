var client = require('./client.js')
var Config = require('./config.js')

module.exports = Dat

function Dat () {
  if (!(this instanceof Dat)) return new Dat()
  this.config = Config()
}

Dat.prototype.joinSync = function (link, dir, opts, cb) {
  var self = this
  if ((typeof opts) === 'function') return this.join(link, dir, {}, opts)
  if (!opts) opts = {}
  client(function (err, rpc, conn) {
    if (err) return cb(err)
    rpc.joinSync(link, dir, function (err) {
      if (err) return cb(err)
      conn.destroy()
      cb()
      self.config.add({
        dir: dir,
        link: link
      }, function () {
        conn.destroy()
        cb()
      })
    })
  })
}

Dat.prototype.join = function (link, dir, opts, cb) {
  var self = this
  if ((typeof opts) === 'function') return this.join(link, dir, {}, opts)
  if (!opts) opts = {}
  client(function (err, rpc, conn) {
    if (err) return cb(err)
    rpc.join(link, dir, function (err) {
      if (err) return cb(err)
      self.config.add({
        dir: dir,
        link: link
      }, function (err) {
        if (err) return cb(err)
        conn.destroy()
        cb()
      })
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

Dat.prototype.remove = function (dir, cb) {
  var self = this
  client(function (err, rpc, conn) {
    if (err) throw err
    rpc.remove(dir)
    self.config.remove({dir: dir})
    conn.destroy()
    cb()
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
