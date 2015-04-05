'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');
var eventStore = require('../stores/events');
var eventActions = require('../actions/events');

var userStore = require('../stores/user');
var userActions = require('../actions/user');



var jwt = require('jsonwebtoken');





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
    var text = 'Delete';
    return (
      <div>
      <BS.Button bsStyle="danger" onClick={this.handleClick}>
        {text}
      </BS.Button>

      <BS.DropdownButton bsStyle="info" title="Ilmoittautuneet">
                    
                <BS.Input type="checkbox" label="Checkbox" />

                <BS.Button bsStyle="success">Hyväksy</BS.Button>


                </BS.DropdownButton>

                </div>
    );
  }
});



var Ilmoittautuminen = React.createClass({

  getInitialState: function() {

        return { liked: false };
    },

  handleClick: function(event) {

        this.setState({liked: !this.state.liked});

    },



  render: function() {

    var text = this.state.liked ? 'Ilmoittauduttu' : 'Olin täällä';

    var väri = this.state.liked ? 'success' : 'warning';

    return (
      
      
      <BS.Button bsStyle={väri} bsSize='large' onClick={this.handleClick}>{text}</BS.Button>
      

    );
  }

});


var Customteko = React.createClass({

  getInitialState: function() {

        return {};
    },


  render: function() {

    var kakka;

    return (
      
      <BS.Panel>

      <BS.DropdownButton bsStyle='primary' title='Lisää customteko'>Valitse käyttäjät

      
      <BS.MenuItem>
      <BS.DropdownButton title='Valitse teko'>
      </BS.DropdownButton>
      </BS.MenuItem>

      </BS.DropdownButton>
      
      </BS.Panel>

    );
  }
  
});






var EventInfo = React.createClass({    
    


   mixins: [userStore.mixin],
 

    getInitialState: function() {
      
        return {
            
            user: userStore.get()
        };
    },

    deleteHandler: function(event) {
        this.props.onDelete(this.props.event);
    },

    getDate: function() {
        return this.props.event.date;
    },


    render: function() {
        

        var user = this.state.user;
        var showShit = true;

        var element;

        /*
        var d = this.props.event.date;
        var n = d.toLocaleDateString();
        */


        if (user.role === 'admin') {

        element = <LikeButton event={this.props.event} />;
     
      } else if (user.role === 'user') {

        element = <Ilmoittautuminen />;

       }







        return (
           
            <BS.Panel bsStyle="primary" header={this.props.event.title + " " + this.props.event.date} >


                

                <img src={this.props.event.image} height="150" width="150" />

                {element}<p></p>

                <div>
                {this.props.event.description} 
                </div>

            </BS.Panel>
        );
  


  }
});

var getState = function() {
    //console.log('haetaan eventStore.get');
  return {
    events: eventStore.get()
  };
};


var EventInfoList = React.createClass({
    mixins: [eventStore.mixin],
   

    deletePost: function(event) {
        var index = this.state.events.indexOf(event);
        this.state.events.splice(index,1);
        this.forceUpdate();
        },



    getInitialState: function() {
        return getState();
        

    },
    componentDidMount: function(){
        var self = this;
        //console.log('tehtii just eventinfolista');

        eventActions.getEvents({
            success: function (res) {
                //console.log('oisko tää: callbackfunktio');
                //console.log(res);
                self.setState({events: res});
            }
        });

        //this.setState({events: [{title:'asdasd',description:'qwe',id:'1'}]})
        
        //this.setState({events: eventStore.get});
    },
    render: function(){

        console.log('tehhään eveninfolist ');
        var stateevents = this.state.events;
        console.log(stateevents)

        var today = new Date();
        var n = today.toJSON();


        var vanhat = []
        var uudet = []


        stateevents.forEach(function(event, i) {

          if (n > stateevents[i].date) {vanhat[i] = <EventInfo event={event} key={event.title} />;

              console.log(stateevents[i].date);

                }

            else {uudet[i] = <EventInfo event={event} key={event.title} />;}


            console.log(stateevents[i].date);

        })




       
        return(     

            <DefaultLayout>



            <div className="ScoreboardPaske">

            <BS.Panel header="Scoreboard" bsStyle='info'>


            <BS.Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
         <tr>
          <td>3</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr> <tr>
          <td>4</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr> <tr>
          <td>5</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr> <tr>
          <td>6</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
       
      </tbody>
    </BS.Table>

            </BS.Panel>

            <Customteko />

            </div>


            
            
            <div className="ListTitle">
           

            

            <div>

            <BS.Panel header='Menneet tapahtumat' bsStyle='danger'>

      

            {vanhat}

              </BS.Panel>
            
            </div>

            

            
            <div>


            <BS.Panel header='Tulevat tapahtumat' bsStyle='success'>

       

            {uudet}

             </BS.Panel>
            </div>



          
            </div>
            
          
           </DefaultLayout>          
        );
    },
    _onChange: function() {
    console.log('_onChange');
    this.setState(getState());
  }
});



 
//module.exports = EventInfo;
module.exports = EventInfoList;