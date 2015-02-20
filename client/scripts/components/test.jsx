'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var ColorWidget = require('./modules/testPageColorWidget.jsx')

var TestComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="test-container">
            <h1>Foobar foobar!!</h1>
            <p>
              We are just testing things.
            </p>
            <ColorWidget />
          </div>
        <code className="version">v0.14.2</code>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  }
});

module.exports = TestComponent;
