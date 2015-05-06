'use strict';

var Dispatcher = require('../dispatchers/default');
var request = require('superagent');
var serialize = require('form-serialize');
var Dispatcher = require('../dispatchers/default');
var userConstants = require('../constants/user');
var eventConstants = require('../constants/events');
var messagesActions = require('./messages');
var routeActions = require('./routes');
var userDefaults = require('../constants/defaults').user;
var cookie = require('cookie');

module.exports = {

  // pitäs muuttaa eventlist tallentumaan storeen

  // setEvents: function(events){
  //   console.log('setEvents, events: ');
  //   console.log(events);
  //   Dispatcher.handleViewAction({
  //     actionType: eventConstants.SET_EVENTS,
  //     events: events
  //   });    
  //   console.log('exit setEvents');
  // },

  getEvents: function(userId, callback){
    //console.log('getEvents')
    var self = this;
    request
      .post('/events.json')
      .type('json')
      .send({userid: userId})
      .end(function(res){ 
        console.log('tässä ois tää serverin vastaus');
        console.log(res);
        //self.setEvents(res.body); 
        callback.success(res.body);     
      });
    //console.log('exit getEvents');
  },

  deleteEvent: function(id){
    console.log('todo: heitä serverille viesti että se poistaa tapahtuman');
  },

  signup: function(eventId, userId){
    request
      .post('/events')
      .send({eventid: eventId, userid: userId})
      .end();
  },

  createEvent: function(form) {

    var self = this;

    var eventti = serialize(form);
    var postUrl = form.getAttribute('action') || window.location.pathname;

    console.log(event);

     request
      .post('/createevent.json')
      .type('form')
      .send(eventti)
      .end();

  }

};