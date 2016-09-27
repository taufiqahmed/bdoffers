var React = require('react');

var AppHeader = require('./app-header.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <AppHeader></AppHeader>
        {this.props.children}
      </div>
    );
  }
})


module.exports = App;
