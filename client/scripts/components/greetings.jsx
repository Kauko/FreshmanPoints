'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');
var eventStore = require('../stores/events');
var eventActions = require('../actions/events');

var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    eventActions.signup();
    this.setState({liked: !this.state.liked});    
  },
  render: function() {
    //var text = this.state.liked ? this.props.event.id : 'Et uskalla painaa tästä';
    var text = 'Ilmoittaudu';
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
            element = <LikeButton event={this.props.event} />;
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
                </div>
            </div>
        );
    }
});

var getState = function() {
    //console.log('haetaan eventStore.get');
  return {
    events: eventStore.get()
  };
};







// var EventInfoList = React.createClass({
//     //mixins: [eventStore.mixin],
//     getInitialState: function() {
//         return getState();
//     },
//     componentDidMount: function(){
//         var self = this;
//         //console.log('tehtii just eventinfolista');

//         eventActions.getEvents({
//             success: function (res) {
//                 //console.log('oisko tää: callbackfunktio');
//                 //console.log(res);
//                 self.setState({events: res});
//             }
//         });

//         //this.setState({events: [{title:'asdasd',description:'qwe',id:'1'}]})
        
//         //this.setState({events: eventStore.get});
//     },
//     render: function(){
//         console.log('tehhään eveninfolist ');
//         var stateevents = this.state.events;
//         console.log(stateevents)
//         var rows = []
//         //tämä rivi tekee tapahtumat kovakoodauksen perusteella
//         //this.props.events.forEach(function(event){    

//         //this.state.events.forEach(function(event){
//         //     {/*rows.push(<div>asd</div>);    //test*/}
//         //     //rows.push(<EventInfo event={event} key={event.title} />);
//         // });
//         return(     
//             <div>
//             <div className="ListTitle"><h1>Täs ois näitä tapahtumia</h1></div>
//             {this.state.events.map(function(event){
//                 return <EventInfo event={event} key={event.id} />
//             })}
//            </div>             
//         );
//     },
//     _onChange: function() {
//     console.log('_onChange');
//     this.setState(getState());
//   }
// });

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
