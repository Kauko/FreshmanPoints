'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');
var scoreboardActions = require('../actions/scoreboard');

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
    return {
      userEvents = [],
      user: userStore.get()
    };
  },

  componentDidMount: function() {
    var self = this;

    eventActions.getEvents({
      success: function(res){
        self.setState({userEvents: res})
      }
    });
  },

  render: function() {
        var people = this.props.userEvents.map(function(person){
          return <Person first={person.first} last={person.last}/>
        });
        return (
          <div>
          {people}
          </div>
          )
  }
  _onChange: function() {
    this.setState(getState());
  }
})


module.exports = ScoreboardComponent;