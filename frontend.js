var api = require('./api')
var status = require('./components/status')
var renderList = require('./components/list')

var $link = document.getElementById('link')
var $loading = document.getElementById('loading')

document.getElementById('submit').onclick = submit

function submit (event) {
  var key = $link.value.trim()
  $link.value = ''
  $loading.style = 'display:block;'
  api.add(key, function (err) {
    if (err) status(err.message)
    else status('Dat added successfully.')
    renderList()
    $loading.style = 'display:none;'
  })
}

renderList()
