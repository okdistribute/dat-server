module.exports = function (err, data) {
  if (data.message) return alert(data.message)
  else alert(err)
}
