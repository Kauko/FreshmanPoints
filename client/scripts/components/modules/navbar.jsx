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

var NavbarComponent = React.createClass({
  mixins: [userStore.mixin],
  getInitialState: function() {
    return getState();
  },
  render: function() {
    var user = this.props.user;
    var navLinks = user.loggedIn ? (
      



        <ul className="nav-list pull-right">
        <li className="nav-item">
          Hello {user.firstName ? user.firstName : user.email}
        </li>
        <li className="nav-item">
          <Link url="/settings">My Account</Link>
        </li>
        <li className="nav-item">
          <Link url="/logout" onClick={this.handleLogout}>Logout</Link>
        </li>
        <li className="nav-item">
          <Link url="/greetings">Greetings</Link>
        </li>
      </ul>
/*
      <ul>

        <BS.NavItem>Hello {user.firstName ? user.firstName : user.email}</BS.NavItem>
     
        <BS.NavItem eventKey="1" href="/settings">My Account</BS.NavItem>
     
        <BS.NavItem eventKey="2" href="/logout" onClick={this.handleLogout}>Logout</BS.NavItem>
     
        <BS.NavItem eventKey="3" href="/greetings">Greetings</BS.NavItem>

      </ul>
*/

    ) : (
     



        <ul>
        <li>
          <Link url="/login">Login</Link>
        </li>
        <li>
          <Link url="/signup">Create Account</Link>
        </li>
      
      <li>
          <Link url="/greetings">Greetings</Link>
        </li>
        </ul>







/*
   
      
        <BS.NavItem eventKey="1" href="/login">Login</BS.NavItem>
      
        <BS.NavItem eventKey="2" href="/signup">Create account</BS.NavItem>
      
        <BS.NavItem eventKey="3" href="/greetings">Greetings</BS.NavItem>

*/
    );

    return (
   
    

      <BS.Navbar brand="Freshman Points -tsydeemi" right eventKey={0} inverse toggleNavKey={0}>

      <BS.Nav>
      
      {navLinks}
      
        

       

      </BS.Nav>
      </BS.Navbar>






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
