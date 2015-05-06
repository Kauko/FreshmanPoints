'use strict';

var React = require('react');
var DefaultLayout = require('../components/layouts/default.jsx');
var BS = require('react-bootstrap');
var eventStore = require('../stores/events');
var eventActions = require('../actions/events');
var userStore = require('../stores/user');
var userActions = require('../actions/user');

var Tapahtumanlisäys = React.createClass({


  handleInput: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    eventActions.createEvent(form);
    console.log(form);
  },

  render: function() {
 
    return (

    <BS.Panel>
    <form enctype='application/json' action="/createevent.json" method="post" onSubmit={this.handleInput}>
    <BS.Input name='Title' type='text' id='title' label='Title' placeholder='Enter title' />
    <BS.Input name='Description' type='text' id='description' label='Description' placeholder='Enter description' />
    <BS.Input name='Date' type='text' id='date' label='Date' placeholder='Enter date'/>
    <BS.Input name='Image' type='text' id='image' label='Image' placeholder='Enter image' />
    <button>Lisää tapahtuma</button>
    </form>
    </BS.Panel>
    );
  }

});

//Ilmoittautumisnappi fuksille 

var Ilmoittautuminen = React.createClass({

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
    var text = this.state.signedup ? 'Peruuta' : 'Ilmoittaudu';
    var väri = this.state.signedup ? 'warning' : 'success';

    return (
      
      <BS.Button bsStyle={väri} onClick={this.handleClick}>{text}</BS.Button>
    );
  }
});

//Napit ilmoittautuneiden näyttämiseen ja tapahtuman poistamiseen
//Pitäisi saada ensin noukittua lista ilmoittautuneista ja jotenkin piilotettua event

var Tapahtumahallinta = React.createClass({

  getInitialState: function() {

    return {};
  },

  handleClick: function(event) {

  },

  render: function() {
 
    return (

      <BS.ButtonGroup>

      <BS.Button bsStyle="danger" onClick={this.handleClick}>Delete</BS.Button>
  
      <BS.DropdownButton bsStyle="info" title="Ilmoittautuneet">

      <BS.Input type="checkbox" label="Checkbox" />
      <BS.Button bsStyle="success">Hyväksy</BS.Button>

      </BS.DropdownButton>

      </BS.ButtonGroup>
    );
  }

});

//Custompisteiden antaminen -komponentti joka ei vielä tee mitään

var Customteko = React.createClass({

  getInitialState: function() {

        return {};
    },

  render: function() {

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
    
   //mixins: [userStore.mixin],
 
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

     //TODO: tapahtuman poisto jos käyttäjällä siihen oikeus
    handleDestroy: function(e) {

    e.preventDefault();
    var form = e.currentTarget;
    eventActions.deleteEvent();
    },

    render: function() {

        var user = this.state.user;
        var showShit = true;
        var element;

        //Eventin päivämäärän parsiminen muotoon dd.mm.yyyy 

        var j = new Date(this.props.event.date);
     
        var z = j.getFullYear();
        var x = j.getMonth() + 1;
        var y = j.getDate();

        var t = y + '.' + x + '.' + z;
                
        //Tähän mahdollisesti roolin/flagin tarkastaminen ja sen mukaan palikoiden näyttäminen kullekin erikseen
                
        if (user.canAccept === true) {

        element = <Tapahtumahallinta event={this.props.event} user={this.props.user}/>;
     
          } else if (user.isFreshman === false) {

        element = <Ilmoittautuminen event={this.props.event} user={this.props.user} hideItem = {this.props.hideItem}/>;

        }

        return (
           
            <BS.Panel bsStyle="primary" header={this.props.event.title + " " + t} >

            <div><img src={this.props.event.image} width="30%"/>

            <BS.Well>
            {this.props.event.description} 
            </BS.Well>

            </div>

            <div>

            {element}

            <a href="/">
            <div className="bg">
            <div className="fb">
            f
            </div>
            </div>
            </a>

            </div>
            
            </BS.Panel>
        );
   }
});

/*
var getState = function() {
   
  return {
    events: eventStore.get()
  };
};
*/

var EventInfoList = React.createClass({
    mixins: [eventStore.mixin],

   getInitialState: function() {

        //laitetaan tämä aluksi tyhjäksi listaksi

        return {

            events: [],
            user: userStore.get()
        };
    },

    componentDidMount: function(){

        var self = this;

        eventActions.getEvents(self.state.user.id,{

            success: function (res) {

                self.setState({events: res});
            }
        });
    },

    hideItem: function(eventid){

        eventActions.deleteEvent(eventid);
        //this.setState({events: this.state.events.splice(eventid)});
    },

    render: function(){

        var user = this.state.user;
        var stateevents = this.state.events;
        var self = this;

        //Haetaan nykyinen päivämäärä ja parsitaan se muotoon yyyy.mm.dd

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

        //Listat tuleville, menneille ja käynnissä oleville eventeille

        var vanhat = []
        var uudet = []
        var käynnissä = []

        //Rullaillaan eventit läpi ja nakellaan ne päivämäärän mukaan oikeisiin listoihin
        //Parsitaan vielä ne JSON-datetkin koska JSON date on vittujen JSON date

        stateevents.forEach(function(event, i) {
        
        var b = new Date(stateevents[i].date);
     
        var i = b.getFullYear();
        var o = b.getMonth() + 1;

         if (o.toString().length === 1) {

              o = "0" + o;
          }

        var p = b.getDate();

        if (p.toString().length === 1) {

              p = "0" + p;
          }

        var b = i + '-' + o + '-' + p;

        if (t === b) {käynnissä[i] = <EventInfo event={event} user={self.state.user} key={event.id} hideItem = {self.hideItem} />;

            }

          else if (t > b) {vanhat[i] = <EventInfo event={event} user={self.state.user} key={event.id} hideItem = {self.hideItem} />;

              }

              else {uudet[i] = <EventInfo event={event} user={self.state.user} key={event.id} hideItem = {self.hideItem} />;}

        })
       
        return(     

            <DefaultLayout>

            <div className="Paska">
            <img src="images/pip.jpg"></img>
            <BS.Button font-size='large'>FUKSI, REKISTERÖIDY</BS.Button>
            </div>

            <div className="ScoreboardPaske">

            <BS.Panel header="Scoreboard" bsStyle='info'>

            <BS.Table hover>
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
            </tr> 

            <tr>
            <td>4</td>
            <td>Jorma Jormala</td>
            <td>42</td>
            </tr> 

            <tr>
            <td>5</td>
            <td>Pentti Hirvonen</td>
            <td>7</td>
            </tr> 

            <tr>
            <td>6</td>
            <td>Väinö "Kivi" Jormala</td>
            <td>0,5</td>
            </tr>
            </tbody>

            </BS.Table>
            </BS.Panel>

            {user.canAccept === false ? <Customteko />
              
            : null}

            <Tapahtumanlisäys />
            
            </div>


            <div className="ListTitle">
           
            <div className="Käynnissä">
            <BS.Panel header='Käynnissä olevat tapahtumat' bsStyle='success'>

            {käynnissä}
            {käynnissä.length === 0 ? 'Ei käynnissä olevia tapahtumia' 
            : null}

            </BS.Panel>
            </div>


            <div className="Menneet">
            <BS.Panel header='Menneet tapahtumat' bsStyle='danger'>

            {vanhat}
            {vanhat.length === 0 ? 'Ei näytettävissä menneitä tapahtumia'
            : null}

            </BS.Panel>
            </div>


            <div className="Tulevat">
            <BS.Panel header='Tulevat tapahtumat' bsStyle='info'>

            {uudet}
            {uudet.length === 0 ? 'Ei näytettävissä tulevia tapahtumia'
            : null}

            </BS.Panel>
            </div>
          
            </div>
            
           </DefaultLayout>      
        );
    },

    _onChange: function() {
    //console.log('_onChange');
    this.setState(getState());
  }
});

module.exports = EventInfoList;