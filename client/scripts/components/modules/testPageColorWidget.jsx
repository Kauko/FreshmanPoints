'use strict';

var React = require('react');
var Link = require('./link.jsx');
var colorWidgetStore = require('../../stores/colorWidget');
var colorWidgetActions = require('../../actions/colorWidget');

var getState = function() {
  return {
    user: colorWidgetStore.get()
  };
};

var NavbarComponent = React.createClass({
  mixins: [colorWidgetStore.mixin],
  getInitialState: function() {
    return getState();
  },
  render: function() {
    var divStyle = {
      color: 'blue'
    }
    return (
      /* jshint ignore:start */
      <div style={divStyle}>
        Hello dude.
      </div>
      /* jshint ignore:end */
    );
  },
  handleLogout: function(e) {
    e.preventDefault();
    colorWidgetActions.logout();
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = NavbarComponent;
