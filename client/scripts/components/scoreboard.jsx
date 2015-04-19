'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');
//var scoreboardActions = require('../actions/scoreboard');


var ScoreboardComponent = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
        <div className="ScoreboardPaske">
        <BS.Panel header = "Scoreboard" bsStyle="info">
        <BS.Table striped condensed responsive hover>
        <thead>
          <tr>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Pisteet</th>
          </tr>
        </thead>
            
        <tbody>
            <PersonList data={this.props.data} />
        </tbody>
        </BS.Table>
        </BS.Panel>
        </div>
      /* jshint ignore:end */
    );
  }
});

var Person = React.createClass({
  render: function() {
    return (
      /* jshint ignore:start */
        <tr>
          <td>{this.props.first}</td>
          <td>{this.props.last}</td>
         <td>{this.props.points}</td>
        </tr>
      /* jshint ignore:end */
      )
  }
});

var data = [
  {first:'Nadir', last:'Derdour', points:'-9000'},
  {first:'Aapo', last:'Salo', points:'20'},
  {first:'Jouni', last:'Mestari', points:'9001'},
  {first:'Tuomas', last:'Höyhtyä', points:'210'},
  {first:'Elisa', last:'Tähtö', points:'1337'}
]

data.sort(function(a,b) { return parseFloat(b.points) - parseFloat(a.points) } );

var PersonList = React.createClass({
  getInitialState: function() {
    return {
      data
    };
  },

//  componentDidMount: function() {
//    var self = this;

//    eventActions.getEvents({
//      success: function(res){
//        self.setState({userEvents: res})
//      }
//    });
//  },

  render: function() {
        var people = this.state.data.map(function(person){
          //people.sort(function(a,b) { return parseFloat(a.points) - parseFloat(b.points) } );
          return (
            <Person first={person.first} last={person.last} points={person.points} />
            );
        });
        return (
          <div>
            {people}
          </div> 
          );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = ScoreboardComponent;