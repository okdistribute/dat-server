var xhr = require('./request')
var renderList = require('./components/list')

var $name = document.getElementById('name')
var $link = document.getElementById('link')

document.getElementById('submit').onclick = submit

function submit (event) {
  var opts = {
    uri: '/dats/' + $name.value.trim() + '/start?link=' + $link.value.trim(),
    json: true
  }
  xhr(opts, function (resp, json) {
    renderList()
    $name.value = ''
    $link.value = ''
  })
}

renderList()
