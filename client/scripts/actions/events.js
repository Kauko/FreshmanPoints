'use strict';

var Dispatcher = require('../dispatchers/default');
var request = require('superagent');

module.exports = {

  setEvents: function(events){
    console.log('setEvents, events: ')
    console.log(events)
    Dispatcher.handleViewAction({
      actionType: eventConstants.SET_EVENTS,
      events: events
    });    
    console.log('exit setEvents');
  },

  getEvents: function(callback){
    //console.log('getEvents')
    var self = this;
    request
      .get('/events')
      .type('json')
      .end(function(res){ 
        //console.log('tässä ois tää serverin vastaus');
        //console.log(res);
        //self.setEvents(res.body); 
        callback.success(res.body);     
      })
    //console.log('exit getEvents');
  },

  signup: function(callback){
  	console.log('tähän pitäs tehä ilmottautumisjuttuja');
  },

};