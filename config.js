var path = require('path')
var mkdirp = require('mkdirp')
var fs = require('fs')
var debug = require('debug')('dat-server')
var homeDir = require('home-dir')

var DAT_PATH = path.join(homeDir(), '.dat')
var CONFIG_PATH = path.join(DAT_PATH, 'config.json')

module.exports = Config

function Config (opts) {
  if (!(this instanceof Config)) return new Config(opts)
  var self = this
  if (!opts) opts = {}
  self.configPath = opts.configPath || CONFIG_PATH
  self.read()
}

Config.prototype.read = function (cb) {
  var self = this
  try {
    var data = fs.readFileSync(self.configPath)
    self.data = JSON.parse(data.toString())
    debug('read', self.data)
    cb()
  } catch (err) {
    self.data = { dats: {} }
    debug('read with err', self.data, err)
    self.write(self.data, cb)
  }
}

Config.prototype.remove = function (dat, cb) {
  var self = this
  self.data.dats[dat.dir] = undefined
  self.write(self.data, cb)
}

Config.prototype.add = function (dat, cb) {
  this.data.dats[dat.dir] = {
    link: dat.link
  }
  this.data.dats[dat.dir] = dat
  debug('added', this.data)
  this.write(this.data, cb)
}

Config.prototype.write = function (data, cb) {
  var self = this
  debug('writing self.data', self.data)
  var writing = JSON.stringify(data, null, 2)
  debug('writing', writing, 'to', self.configPath)
  mkdirp(DAT_PATH, function (err) {
    if (err) return cb(err)
    fs.writeFile(self.configPath, writing, cb)
  })
}
