'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var eventConstants = require('../constants/events');
var eventDefaults = require('../constants/defaults').events;

var _events;

var EventStore = new Store({

  // Gets data associated with the current user.
  get: function() {
  	//console.log('eventstore.get ' + _events);
    return _events || eventDefaults;
  }

});

EventStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === eventConstants.SET_EVENTS) {
    _events = action.events;
    console.log('tässä pitäs _events olla vaihettu');
    console.log(_events);

    EventStore.emitChange();
  }

});

module.exports = EventStore;
