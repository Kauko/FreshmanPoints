'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');

var ScoreboardComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <BS.Table className="shittable">
          <Person first="Apina" last="paske" points="120" />
          <Person first="Nadir" last="Derdour" points="-9000" />
          <BS.Button bsStyle="primary">Primary</BS.Button>
        </BS.Table>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  }
});

var Person = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <tr>
        <td>
          <h2>{this.props.last}</h2>
        </td>
        <td>
          <h2>{this.props.first}</h2>
        </td>
        <td>
          <h2>{this.props.points}</h2>
        </td>
      </tr>
      )
  }

})

module.exports = ScoreboardComponent;