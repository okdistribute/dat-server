var fs = require('fs')
var path = require('path')
var test = require('tape')
var client = require('./client.js')
var sockPath = path.join(__dirname, 'datmon.sock')

test('kills the matt daemon', function (t) {
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
