var xhr = require('./request')
var renderList = require('./components/list')

var $name = document.getElementById('name')
var $link = document.getElementById('link')
var $loading = document.getElementById('loading')

document.getElementById('submit').onclick = submit

function submit (event) {
  var opts = {
    uri: '/dats/' + $name.value.trim() + '/start?link=' + $link.value.trim(),
    json: true
  }
  $name.value = ''
  $link.value = ''
  $loading.style = 'display:block;'
  xhr(opts, function (resp, json) {
    renderList()
    $loading.style = 'display:none;'
  })
}

renderList()
