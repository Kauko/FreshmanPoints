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
        <BS.Table striped hover>
        <thead>
          <tr>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Nimimerkki</th>
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
          <td>{this.props.nick}</td>
          <td>{this.props.points}</td> 
        </tr>
      /* jshint ignore:end */
      )
  }
});

var data = [
  {first:'Nadir', last:'Derdour', nick:'asd', points:'-9000', id:1},
  {first:'Aapo', last:'Salo', points:'20', id:2},
  {first:'Jouni', last:'Mestari', points:'9001', id:3},
  {first:'Tuomas', last:'Höyhtyä', points:'210', id:4},
  {first:'Nadir', last:'Derdour', nick:'asd', points:'-9000', id:5},
  {first:'Aapo', last:'Salo', points:'20', id:6},
  {first:'Jouni', last:'Mestari', points:'9001', id:7},
  {first:'Tuomas', last:'Höyhtyä', points:'210', id:8},
  {first:'Nadir', last:'Derdour', nick:'asd', points:'-9000', id:9},
  {first:'Aapo', last:'Salo', points:'20', id:10},
  {first:'Jouni', last:'Mestari', points:'9001', id:11},
  {first:'Tuomas', last:'Höyhtyä', points:'210', id:12},
  {first:'Elisa',nick:'asd', last:'Tähtö', points:'1337',id:13}
]

data.sort(function(a,b) { return parseFloat(b.points) - parseFloat(a.points) });

var PersonList = React.createClass({
  getInitialState: function() {
    return {
      sortData
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
        //this.state.data.sort(people.sort(function(a,b) { return parseFloat(a.points) - parseFloat(b.points) } ))
        var people = this.state.data.map(function(person){
          
          return (
            <Person first={person.first} last={person.last} nick={person.nick} points={person.points} key={person.id} />
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