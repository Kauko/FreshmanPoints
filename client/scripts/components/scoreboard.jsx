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
          <ScoreList data = {this.props.data} />
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

var ScoreList = React.createClass({
  render:function(){
    var people = this.props.data.map(function(person){
      return <Person first={person.first} last={person.last} points={person.points} />
    })
  }
})

var data = [
  {
    first:'Nadir', last='Derdour' points = '-9000'
    first:'dsadr', last='as' points = '123' 
  }
]

module.exports = ScoreboardComponent;