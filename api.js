var xhr = require('./request')

module.exports = {
  delete: function (key, cb) {
    var opts = {
      uri: '/dats',
      method: 'DELETE',
      json: {key}
    }
    xhr(opts, cb)
  },
  list: function (cb) {
    xhr({uri: '/dats', json: true}, function (err, resp, json) {
      if (err) return cb(err)
      return cb(null, json)
    })
  },
  add: function (key, cb) {
    var opts = {
      method: 'POST',
      uri: '/dats',
      json: {
        key: key
      }
    }
    xhr(opts, cb)
   }
}
