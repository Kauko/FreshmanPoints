'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');
var userStore = require('../stores/user');
var eventActions = require('../actions/events');

var LikeButton = React.createClass({
  getInitialState: function() {
    return {signedup: this.props.event.signedup};
  },
  handleClick: function(event) {
    //this.props.hideItem(this.props.event.id);
    eventActions.signup(this.props.event.id, this.props.user.id);
    this.setState({signedup: !this.state.signedup});    
  },
  render: function() {
    var user = this.props.user;
    var text = this.state.signedup ? 'Peruuta ilmoittautuminen' : 'Ilmoittaudu';
    return (
      <BS.Button onClick={this.handleClick}>
        {text}
      </BS.Button>
    );
  }
});

var EventInfo = React.createClass({    
    render: function() {
        var showShit = true;
        var element;
        if (showShit){
            element = <LikeButton 
                        event={this.props.event}
                        user={this.props.user}
                        hideItem = {this.props.hideItem} />;
        }
        return (
            <div className="EventInfoContainer">
                <div className="box">
                    <img src={this.props.event.image} height="150" width="150" />             
                </div>
                <div className="box">
                    <h3>{this.props.event.title}</h3>
                    <div>{this.props.event.description}</div>
                    {element}
                    <form id="delete-form" action="/user?_method=DELETE" method="post" onSubmit={this.handleDestroy}>
                      <button>Poista tapahtuma</button>
                    </form>
                </div>
            </div>
        );
    },
    //TODO: tapahtuman poisto jos käyttäjällä siihen oikeus
    handleDestroy: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    eventActions.deleteEvent();
  }
});

// var getState = function() {
//     //console.log('haetaan eventStore.get');
//   return {
//     events: eventStore.get()
//   };
// };

var EventInfoList = React.createClass({
    //mixins: [eventStore.mixin],    
    getInitialState: function() {
        //laitetaan tämä aluksi tyhjäksi listaksi
        return {
            events: [],
            user: userStore.get()
        };
    },
    componentDidMount: function(){
        var self = this;
        //console.log(this.state.user);
        eventActions.getEvents(self.state.user.id,{
            success: function (res) {
                //console.log('oisko tää: callbackfunktio');
                //console.log(res);
                self.setState({events: res});
            }
        });
    },
    hideItem: function(eventid){
        eventActions.deleteEvent(eventid);
        //this.setState({events: this.state.events.splice(eventid)});
    },
    render: function(){
        //console.log('tehhään eveninfolist ');
        var stateevents = this.state.events;
        //console.log(stateevents)
        var rows = []
        var self = this;

        return(     
            <div>
            <div className="ListTitle"><h1>Täs ois näitä tapahtumia</h1></div>
            {this.state.events.map(function(event){
                return <EventInfo 
                    event={event} 
                    user={self.state.user}
                    key={event.id} 
                    hideItem = {self.hideItem} />
            })}
           </div>             
        );
    },
    _onChange: function() {
    //console.log('_onChange');
    this.setState(getState());
  }
});

module.exports = EventInfoList;
