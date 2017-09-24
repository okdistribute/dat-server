var xhr = require('./request')
var renderList = require('./components/list')

var $link = document.getElementById('link')
var $loading = document.getElementById('loading')

document.getElementById('submit').onclick = submit

function submit (event) {
  var opts = {
    method: 'POST',
    uri: '/dats',
    json: {
      key: $link.value.trim()
    }
  }
  $link.value = ''
  $loading.style = 'display:block;'
  xhr(opts, function (resp, json) {
    renderList()
    $loading.style = 'display:none;'
  })
}

renderList()
