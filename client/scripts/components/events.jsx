'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');
var userStore = require('../stores/user');
var eventActions = require('../actions/events');

var LikeButton = React.createClass({
  getInitialState: function() {
    return {clicked: false};
  },
  handleClick: function(event) {
    //this.props.hideItem(this.props.event.id);
    eventActions.signup(this.props.event.id, this.props.user.id);
    this.setState({clicked: !this.state.clicked});    
  },
  render: function() {
    var user = this.props.user;
    //var text = this.state.liked ? this.props.event.id : 'Et uskalla painaa tästä';
    var text = this.state.clicked ? 'Peruuta ilmoittautuminen' : 'Ilmoittaudu';
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
                    {/*<img src="images/KappaHD.jpg" height="150" width="150" />  */}               
                </div>
                <div className="box">
                    {/*<h3>Täs ois tää tapahtuma</h3>
                    <div>Sielon kaikkia hienoja juttuja</div>*/}
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
    handleDestroy: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.destroy(form);
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

        eventActions.getEvents({
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
        //tämä rivi tekee tapahtumat kovakoodauksen perusteella
        //this.props.events.forEach(function(event){    

        //this.state.events.forEach(function(event){
        //     {/*rows.push(<div>asd</div>);    //test*/}
        //     //rows.push(<EventInfo event={event} key={event.title} />);
        // });
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
    console.log('_onChange');
    this.setState(getState());
  }
});

//nämä on eventinfolistin returnissa olleita testailuja

// <ul>
//             <EventInfo event={{title:'qw',description:'q'}} />
//             <EventInfo event={{title:'qw',description:'q'}} />
//             </ul>  

// <table> {/*tähän on varmaan järkevämpiki ratkasu*/}
            //     <thead>
            //         <div className="ListTitle"><h1>Täs ois näitä tapahtumia</h1>
            //         <BS.Button> bootstrapin nappula</BS.Button>
            //         <button>normi</button>
            //         </div>
            //     </thead>
            //     <tbody>{rows}</tbody>
            // </table>

 
//module.exports = EventInfo;
module.exports = EventInfoList;
