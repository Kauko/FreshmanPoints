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
      
      <BS.Button bsStyle={väri} onClick={this.handleClick}>{text}</BS.Button>

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

        
        var j = new Date(this.props.event.date);
     

        var z = j.getFullYear();

        var x = j.getMonth() + 1;

        var y = j.getDate();

      

        var t = y + '.' + x + '. ' + z;
                



        if (user.role === 'admin') {

        element = <LikeButton event={this.props.event} />;
     
      } else if (user.role === 'user') {

        element = <Ilmoittautuminen />;

       }



        return (
           
            <BS.Panel bsStyle="primary" header={this.props.event.title + " " + t} >



                <img src={this.props.event.image} width="40%" height="auto" />

                {element}<p></p>

                <div>
                {this.props.event.description} 
                </div>

            </BS.Panel>
        );
  


  }
});

var getState = function() {
   
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
        

        eventActions.getEvents({
            success: function (res) {
              
                self.setState({events: res});
            }
        });

       
    },
    render: function(){

        var stateevents = this.state.events;
  

        var today = new Date();

        var y = today.getFullYear();


        var m = today.getMonth() + 1;

         if (m.toString().length === 1) {

                m = "0" + m;
            }


        var d = today.getDate();

         if (d.toString().length === 1) {

                d = "0" + d;
            }


        var t = y + '-' + m + '-' + d;



        console.log(t);


        var vanhat = []
        var uudet = []
        var käynnissä = []


        stateevents.forEach(function(event, i) {

          

          if (t === stateevents[i].date) {käynnissä[i] = <EventInfo event={event} key={event.title} />;

             }


           else if (t > stateevents[i].date) {vanhat[i] = <EventInfo event={event} key={event.title} />;

              console.log(stateevents[i].date);

                }

            else {uudet[i] = <EventInfo event={event} key={event.title} />;}

            console.log(stateevents[i].date);

        })

        console.log(käynnissä);


       
        return(     

            <DefaultLayout>

            <div className="ScoreboardPaske">

            <BS.Panel header="Scoreboard" bsStyle='info'>


            <BS.Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nimi</th>
          <th>Pisteet</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Erkki Penttiläinen</td>
          <td>Yli 9000</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Pentti Erkkiläinen</td>
          <td>420</td>
        </tr>
         <tr>
          <td>3</td>
          <td>Anu Saukko</td>
          <td>69</td>
        </tr> <tr>
          <td>4</td>
          <td>Jorma Jormala</td>
          <td>42</td>
        </tr> <tr>
          <td>5</td>
          <td>Pentti Hirvonen</td>
          <td>7</td>
        </tr> <tr>
          <td>6</td>
          <td>Väinö "Kivi" Jormala</td>
          <td>0,5</td>
        </tr>
       
      </tbody>
    </BS.Table>

            </BS.Panel>

            <Customteko />

            </div>


      
            
            <div className="ListTitle">
           

            <div className="Kännissä">

            <BS.Panel header='Käynnissä olevat tapahtumat' bsStyle='success'>


            {käynnissä}

            {käynnissä.length === 0 ?

              'Ei käynnissä olevia tapahtumia'

            : null}


            </BS.Panel>
            
            </div>





            <div className="Menneet">

            <BS.Panel header='Menneet tapahtumat' bsStyle='danger'>

      

            {vanhat}

            {vanhat.length === 0 ?

              'Ei näytettävissä menneitä tapahtumia'

            : null}

            </BS.Panel>
            
            </div>

            

            
            <div className="Tulevat">


            <BS.Panel header='Tulevat tapahtumat' bsStyle='info'>

            {uudet}

            {uudet.length === 0 ?

              'Ei näytettävissä tulevia tapahtumia'

            : null}

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

 
module.exports = EventInfoList;