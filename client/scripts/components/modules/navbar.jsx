'use strict';

var React = require('react');
var Link = require('./link.jsx');
var userStore = require('../../stores/user');
var userActions = require('../../actions/user');
var BS = require('react-bootstrap');

var getState = function() {
  return {
    user: userStore.get()
  };
};


var icon = (



    <div>
    <span class="logo">
      <a href="/"> 
        <img src="images/blank.png" height="24" width="24" alt="Freshman Points" /></a>
    </span> &nbsp;
      Freshman Points -tsydeemi
    </div>
  );



var NavbarComponent = React.createClass({
  mixins: [userStore.mixin],
  getInitialState: function() {
    return getState();
  },
  render: function() {
    
    var user = this.props.user;
    var navLinks = user.loggedIn ? (
      
      
      //<BS.NavItem>Hello {user.firstName ? user.firstName : user.email}</BS.NavItem>
      
    <BS.Navbar brand={icon} href="/" inverse toggleNavKey={0}>



      <BS.Nav collapseable right eventKey={0}>

       

        <BS.NavItem eventKey={0} active href="/">Home</BS.NavItem>

        

        <BS.NavItem eventKey={1} href="/settings">My Account</BS.NavItem>
     
        <BS.NavItem eventKey={2} href="/logout" onClick={this.handleLogout}>Logout</BS.NavItem>
     
        <BS.NavItem eventKey={3} href="/greetings">Greetings</BS.NavItem>

      </BS.Nav>




    </BS.Navbar>
      


    ) : (
     



    <BS.Navbar brand='Freshman Points -tsydeemi' href="/" inverse toggleNavKey={0}>


      <BS.Nav collapseable right eventKey={0}>
      
        <BS.NavItem eventKey={0} active href="/">Home</BS.NavItem>

        <BS.NavItem eventKey={1} href="/login">Login</BS.NavItem>
      
        <BS.NavItem eventKey={2} href="/signup">Create account</BS.NavItem>
      
        <BS.NavItem eventKey={3} href="/greetings">Greetings</BS.NavItem>

      </BS.Nav>


    </BS.Navbar>

    );
    
    
 return (
     

        

    <div>

    {navLinks}
      
    </div>


       
      
    );





  },
  handleLogout: function(e) {
    e.preventDefault();
    userActions.logout();
  },
  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = NavbarComponent;
