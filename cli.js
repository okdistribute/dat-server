#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2))
var server = require('./server.js')

var port = process.env.PORT || args.PORT || 8080

server.listen(port, function () {
  console.log('http://localhost:' + port)
})
