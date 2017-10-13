var $status = document.getElementById('status')

module.exports = function (message, klass) {
  $status.innerHTML = message
  $status.classList.add(klass)
  $status.style = 'display:block;'
  setTimeout(function () {
    $status.classList.remove(klass)
    $status.style = 'display:none;'
  }, 4004)
}
