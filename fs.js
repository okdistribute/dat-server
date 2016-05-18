var through = require('through2')

// `stats` is for rendering progress bars
module.exports.createDownloadStream = function (archive, stats, opts) {
  if (!stats) stats = {progress: {}, fileQueue: []}
  if (!opts) opts = {}

  var downloader = through.obj(function (item, enc, next) {
    var fileStats = {bytesRead: 0}
    if (opts.files && (opts.files.indexOf(item.name)) === -1) return next()
    archive.download(item, function (err) {
      if (err) return next(err)
      if (item.type === 'directory') stats.progress.directories++
      else stats.progress.filesRead++
      fileStats.bytesRead += item.length
      stats.progress.bytesRead += item.length
      next()
    })
    if (item.type === 'file') {
      stats.fileQueue.push({
        name: item.name,
        stats: fileStats
      })
    }
  })
  downloader.stats = stats
  return downloader
}
