var Dat = require('../dat.js')
var path = require('path')
var fs = require('fs')
var test = require('tape')

var FIXTURES_DIR = path.join(__dirname, 'testdat')
var DOWNLOAD_DIR = path.join(__dirname, 'downloads')

test('link generates itself', function (t) {
  var dat = Dat()
  dat.link(FIXTURES_DIR, function (err, link) {
    t.ifError(err)
    t.equals(link.length, 64)
    t.end()
    dat.close()
  })
})

test('replicates link properly', function (t) {
  var dat = Dat()
  dat.link(FIXTURES_DIR, function (err, link) {
    t.ifError(err)
    t.equals(link.length, 64)
    dat.join(link, FIXTURES_DIR, function (err) {
      t.ifError(err)
      dat.join(link, DOWNLOAD_DIR, function (err) {
        t.ifError(err)
        var files = fs.readdirSync(FIXTURES_DIR)
        files.forEach(function (file) {
          var downloadPath = path.join('downloads', file)
          t.true(fs.existsSync(downloadPath), 'file ' + downloadPath + ' exists')
        })
        dat.close()
        t.end()
      })
    })
  })
})
