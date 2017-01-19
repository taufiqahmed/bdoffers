var React = require('react');

var AppHeader = require('./app-header.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="">
        <AppHeader></AppHeader>
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
})


module.exports = App;
