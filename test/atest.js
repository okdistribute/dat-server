var discoverySwarm = require('discovery-swarm')
var test = require('tape')
var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var raf = require('random-access-file')
var hyperdrive = require('hyperdrive')
var memdb = require('memdb')

test('download with swarm', function (t) {
  rimraf.sync(path.join(__dirname, 'downloads'))
  var drive = hyperdrive(memdb())
  var drive2 = hyperdrive(memdb())
  var archive = drive.createArchive({
    file: function (name) {
      return raf(path.join(__dirname, name))
    }
  })
  archive.append('hello.txt', function () {
    finalize()
  })
  function finalize () {
    archive.finalize(function (err) { // finalize the archive
      t.error(err, 'no error')
      var link = new Buffer(archive.key, 'hex')
      archive = drive.createArchive(link, {
        file: function (name) {
          console.log('raf ', name)
          return raf(path.join(__dirname, name))
        }
      })
      var archive2 = drive2.createArchive(link, {
        file: function (name) {
          console.log('raf download', name)
          return raf(path.join(__dirname, 'downloads', name))
        }
      })

      archive.on('upload', function (entry, data) {
        console.log('uploading', entry, data)
      })

      var swarm = discoverySwarm()
      swarm.listen()
      swarm.join(link)
      swarm.on('connection', function (connection) {
        connection.pipe(archive.replicate()).pipe(connection)
      })
      var swarm2 = discoverySwarm()
      swarm2.listen(0)
      swarm2.join(link)
      swarm2.on('connection', function (connection) {
        connection.pipe(archive2.replicate()).pipe(connection)
      })

      var stream = archive2.list()
      stream.on('data', function (entry) {
        t.same(entry.name, 'hello.txt', 'got entry')
        archive2.download(entry, function (err) {
          t.error(err, 'no error')
          var contents = fs.readFileSync(path.join(__dirname, 'downloads', 'hello.txt')).toString()
          t.same(contents, 'helloworld\n', 'contents downloaded to disk')
          swarm.close()
          swarm2.close()
          t.end()
        })
      })
    })
  }
})
