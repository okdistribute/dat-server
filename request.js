var xhr = require('xhr')

module.exports = function (opts, cb) {
  xhr(opts, function (err, resp, json) {
    if (err) return cb(err, resp, json)
    if (resp.statusCode === 500) return cb(new Error(json.message), resp, json)
    return cb(null, resp, json)
  })
}
