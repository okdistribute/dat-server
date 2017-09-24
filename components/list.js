var React = require('react')
var ReactDOM = require('react-dom')
var prettyBytes = require('pretty-bytes')
var EditInPlace = require('react-editinplace')

var xhr = require('../request.js')

var DeleteButton = React.createClass({
  delete: function () {
    var self = this
    var opts = {
      uri: '/dats',
      method: 'DELETE',
      json: {
        key: this.props.dat
      }
    }
    xhr(opts, function (resp, json) {
      render()
    })
  },
  render: function () {
    return <a onClick={this.delete} className='red waves-effect waves-light btn'>Delete</a>
  }
})

var ListItem = React.createClass({
  render: function () {
    return (
      <div className='section list-item' onClick={this.handleClick}>
        <p>{this.props.dat}</p>
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
        {this.props.dats.map(function (key) {
          return <ListItem dat={key} key={key} />
        })}
      </div>
    )
  }
})

module.exports = render

function render (cb) {
  xhr({uri: '/dats', json: true}, function (resp, json) {
    if (cb) cb(json)
    _render(json)
  })
}

function _render (dats) {
  ReactDOM.render(
    <List dats={dats} />,
    document.getElementById('app')
  )
}
