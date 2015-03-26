'use strict';

var React = require('react');
var DefaultLayout = require('./layouts/default.jsx');
var BS = require('react-bootstrap');
var eventStore = require('../stores/events');
var eventActions = require('../actions/events');

var userStore = require('../stores/user');
var userActions = require('../actions/user');


var jwt = require('jsonwebtoken');






var MenneetTapahtumat = React.createClass({

    render: function(){
      
        return (
           
           <BS.PageHeader>Menneet tapahtumat:</BS.PageHeader>

        );
    }
});



var TulevatTapahtumat = React.createClass({

    render: function(){
      
        return (
           
            <BS.PageHeader>Tulevat tapahtumat:</BS.PageHeader>
            
        );
    }
});










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
      <BS.Button onClick={this.handleClick}>
        {text}
      </BS.Button>

      <BS.DropdownButton bsStyle="info" title="Ilmoittautuneet">
                    
                <BS.Input type="checkbox" label="Checkbox" />

                <BS.Button>Hyväksy</BS.Button>


                </BS.DropdownButton>

                </div>
    );
  }
});



var Tekokomponentti = React.createClass({
  getInitialState: function() {
    return {};
  },

  handleClick: function(event) {
    eventActions.signup();
    this.setState({liked: !this.state.liked});    
  },


  render: function() {
    //var text = this.state.liked ? this.props.event.id : 'Et uskalla painaa tästä';

    return (

      <div>
      <BS.Panel header="Lisää teko" bsStyle="info">
      
      <BS.DropdownButton title="Dropdown">
        <BS.MenuItem eventKey="1">Dropdown link</BS.MenuItem>
        <BS.MenuItem eventKey="2">Dropdown link</BS.MenuItem>
      </BS.DropdownButton>

      </BS.Panel>
      </div>
    );
  }
});


var getState = function() {
  return {
    user: userStore.get()
  };
};

var EventInfo = React.createClass({    
    


   mixins: [userStore.mixin],
  getInitialState: function() {
    return getState();
    
  },


    deleteHandler: function(event) {
        this.props.onDelete(this.props.event);
    },




    render: function() {
        
   

        var user = this.state.user;
        console.log(this.state.user);
        

        var showShit = true;

        var element;


        element = <LikeButton event={this.props.event} />;
     



        return (
           
            <BS.Panel bsStyle="primary" header={this.props.event.title + " " + this.props.event.date} >



                <img src={this.props.event.image} height="150" width="150" />
                    

                {this.props.event.description} 


                {element}


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
    //mixins: [eventStore.mixin],
   

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
       


        var rows = []
        //tämä rivi tekee tapahtumat kovakoodauksen perusteella
        //this.props.events.forEach(function(event){    

        //this.state.events.forEach(function(event){
        //     {/*rows.push(<div>asd</div>);    //test*/}
        //     //rows.push(<EventInfo event={event} key={event.title} />);
        // });
        return(     
            <DefaultLayout>


           

            

            <div className="ScoreboardPaske">

            <BS.PageHeader>Tässä ois vaikka Scoreboard-kikkare tai jotain muuta, emt lol</BS.PageHeader>

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

            </div>



            
            <div className="ListTitle">
           
            


            <div>

            <TulevatTapahtumat />

            {this.state.events.map(function(event){


          

            return <EventInfo event={event} key={event.id} />
                
            


              })}
            
            </div>





            
            <div>

            <MenneetTapahtumat />

            {this.state.events.map(function(event){

           

            return <EventInfo event={event} key={event.id} />
                

              })}
            
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