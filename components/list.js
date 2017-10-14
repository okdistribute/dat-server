var React = require('react')
var ReactDOM = require('react-dom')
var prettyBytes = require('pretty-bytes')
var EditInPlace = require('react-editinplace')
var prettyBytes = require('pretty-bytes')

var api = require('../api')
var xhr = require('../request.js')

var DeleteButton = React.createClass({
  delete: function () {
    var self = this
    api.delete(this.props.dat, function (err, resp, json) {
      render()
    })
  },
  render: function () {
    return <a onClick={this.delete} className='red waves-effect waves-light btn'>Delete</a>
  }
})

var ListItem = React.createClass({
  render: function () {
    var health = this.props.dat.health
    console.log(this.props.dat)
    return (
      <div className='section list-item' onClick={this.handleClick}>
        <p>{this.props.dat.key}</p>
        <p>
          {prettyBytes(health.byteLength)}
        </p>
        <p>
          {health.peers.length} peers
        </p>
        <div>
          <DeleteButton dat={this.props.dat} />
        </div>
      </div>
    )
  }
})

var List = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.dats.map(function (dat) {
          return <ListItem dat={dat} key={dat.key} />
        })}
      </div>
    )
  }
})

module.exports = function render (cb) {
  api.list(function (err, dats) {
    if (cb) cb(dats)
    if (!dats) dats = []
    ReactDOM.render(
      <List dats={dats} />,
      document.getElementById('app')
    )
  })
}
