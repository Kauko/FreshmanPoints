'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');


var data = [
  {First: 'Nadir', last: 'Derdour', points: '-9000'},
  {First: 'Aapo', last: 'Salo', points: '20'},
]

var ScoreboardComponent = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <BS.Table className="shittable">
          <PersonList data={this.props.data} />
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
        //<td>
          //<h2>{this.props.points}</h2>
        //</td>
      </tr>
      /* jshint ignore:end */
      )
  }
});

var PersonList = React.createClass({
  getInitialState: function() {
    return getSate();
  },

  componentDidMount: function() {
    var self = this;

    eventActions.getEvents({
      success: function(res){
        self.setState({users: res})
      }
    });
  },

  render: function() {
        var people = this.props.data.map(function(person){
          return <Person first={person.first} last={person.last} person={person.points} />
        });
        return (
          <div>
          {people}
          </div>
          )
  }
})


module.exports = ScoreboardComponent;