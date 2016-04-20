var path = require('path')
var fs = require('fs')
var homeDir = require('home-dir')

var CONFIG_PATH = path.join(homeDir(), '.dat', 'config.json')

module.exports = Config

function Config (opts) {
  if (!(this instanceof Config)) return new Config(opts)
  var self = this
  if (!opts) opts = {}
  self.configPath = opts.configPath || CONFIG_PATH
  self.read()
}

Config.prototype.read = function () {
  var self = this
  try {
    var data = fs.readFileSync(self.configPath)
  } catch (err) {
    self.data = { dats: [] }
    self.write()
    return
  }
  self.data = JSON.parse(data.toString())
  self.write()
}

Config.prototype.add = function (dat) {
  var self = this
  self.read()
  self.data.dats[dat.dir] = {
    link: dat.link,
    opts: dat.opts
  }
  self.write()
}

Config.prototype.write = function () {
  var self = this
  fs.writeFileSync(self.configPath, JSON.stringify(self.data))
}
