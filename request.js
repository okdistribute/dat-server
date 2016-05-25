var xhr = require('xhr')
var error = require('./components/error.js')

module.exports = function (opts, cb) {
  xhr(opts, function (err, resp, json) {
    if (err || resp.statusCode === 500) error(err, json)
    return cb(resp, json)
  })
}
