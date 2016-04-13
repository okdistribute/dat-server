var fs = require('fs')
var path = require('path')
var test = require('tape')
var client = require('../client.js')
var os = require('os')
var sockPath = path.join(os.tmpdir(), 'datserver.sock')
var testdat = path.join(__dirname, 'testdat')

test('close and destroy kills the matt daemon', function (t) {
  client(function (err, rpc, conn) {
    t.ifErr(err)
    t.ok(true, 'called client callback')
    t.ok(fs.existsSync(sockPath), 'sock exists')
    rpc.close(function (err) {
      t.ifErr(err)
      t.ok(true, 'called close callback')
      conn.destroy()
      t.notOk(fs.existsSync(sockPath), 'sock does not exist')
      t.end()
    })
  })
})

test('gets a stream from join', function (t) {
  client(function (err, rpc, conn) {
    t.ifErr(err)
    t.ok(true, 'called the client connect callback')
    rpc.close(function (err) {
      t.ifErr(err)
      conn.destroy()
      t.end()
    })
  })
})

test('link', function (t) {
  client(function (err, rpc, conn) {
    t.ifErr(err)
    rpc.link(testdat, function (err, link) {
      t.ifErr(err)
      t.equals(link, 'f692fb02bc5bfd8faa32b1749da6d38c16104cbfffbf0d84a4f7708ed55009d7')
      conn.destroy()
      t.end()
    })
  })
})

test('status', {timeout: 5000}, function (t) {
  client(function (err, rpc, conn) {
    t.ifErr(err, 'no err')
    rpc.link(testdat, function (err, link) {
      t.ifErr(err, 'no err')
      t.equals(link, 'f692fb02bc5bfd8faa32b1749da6d38c16104cbfffbf0d84a4f7708ed55009d7')
    })

    // tests basename
    rpc.status(function (err, status) {
      t.ifErr(err, 'no err')
      var key = Object.keys(status)[0]
      var dir = path.basename(key)
      t.equals(dir, 'testdat', 'basename matches')
    })

    // tests status value
    var gotCompleteStatus = false
    setTimeout(getStatus, 10)
    function getStatus () {
      if (gotCompleteStatus) {
        t.ok(true, 'got complete status')
        conn.destroy()
        t.end()
        return
      }
      rpc.status(function (err, status) {
        if (err) t.ifErr(err, 'no err')
        var key = Object.keys(status)[0]
        if (status[key].progress.bytesRead === 3) gotCompleteStatus = true
        setTimeout(getStatus, 10)
      })
    }
  })
})
