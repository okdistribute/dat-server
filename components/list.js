var React = require('react')
var ReactDOM = require('react-dom')
var prettyBytes = require('pretty-bytes')
var EditInPlace = require('react-editinplace')

var xhr = require('../request.js')

var StopButton = React.createClass({
  getInitialState: function () {
    return {loading: false}
  },
  stop: function () {
    var self = this
    self.setState({loading: true})
    var key = self.props.dat.key
    var opts = {
      uri: '/dats/' + key + '/stop',
      json: true
    }
    xhr(opts, function (resp, data) {
      self.setState({loading: false})
      self.props.list.toggle()
    })
  },
  render: function () {
    var icon = this.loading ? 'loop' : 'stop'
    return (
      <a className='btn waves-effect waves-light list-item__button'
         onClick={this.stop}>
      <i className='material-icons left'>{icon}</i>Stop</a>
    )
  }
})

var StartButton = React.createClass({
  getInitialState: function () {
    return {loading: false}
  },
  start: function () {
    var self = this
    self.setState({loading: true})
    var key = self.props.dat.key
    var opts = {
      uri: '/dats/' + key + '/start',
      json: true
    }
    xhr(opts, function (resp, data) {
      self.setState({loading: false})
      self.props.list.toggle()
    })
  },
  render: function () {
    var icon = this.state.loading ? 'loop' : 'play_arrow'
    return (
      <a className='btn waves-effect waves-light list-item__button'
         onClick={this.start}>
      <i className='material-icons left'>{icon}</i> Start</a>
    )
  }
})

var NameLabel = React.createClass({
  getInitialState: function () {
    return {
      key: this.props.dat.key
    }
  },
  onchange: function (text) {
    var self = this
    text = text.trim()
    var opts = {
      uri: '/dats/' + self.state.key,
      method: 'PUT',
      json: {
        key: text
      }
    }
    xhr(opts, function (resp, json) {
      self.setState({key: text})
    })
  },
  render: function () {
    return (
    <h5>
      <EditInPlace
        onChange={this.onchange}
        text={this.state.key}
        className='list-item__key' />
    </h5>
    )
  }
})

var DeleteButton = React.createClass({
  delete: function () {
    var self = this
    var opts = {
      uri: '/dats/' + this.props.dat.key,
      method: 'DELETE',
      json: true
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
  getInitialState: function () {
    return {
      running: this.props.dat.value.state === 'active'
    }
  },
  toggle: function () {
    this.setState(function (prev) {
      return {running: !prev.running}
    })
  },
  render: function () {
    var size = prettyBytes(this.props.dat.value.stats.size)
    return (
      <div className='section list-item' onClick={this.handleClick}>
        <NameLabel dat={this.props.dat} />
        <div>{size}</div>
        <p>{this.props.dat.value.link}</p>
        <div>
          {this.state.running ? <StopButton list={this} dat={this.props.dat} /> : <StartButton list={this} dat={this.props.dat} />}
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
          return <ListItem key={dat.key} dat={dat} />
        })}
      </div>
    )
  }
})

module.exports = render

function render (cb) {
  xhr({uri: '/dats', json: true}, function (resp, json) {
    _render(json.dats)
    if (cb) cb(json.dats)
  })
}

function _render (dats) {
  ReactDOM.render(
    <List dats={dats} />,
    document.getElementById('app')
  )
}
