'use strict';

var Store = require('./default');
var Dispatcher = require('../dispatchers/default');
var colorWidgetConstants = require('../constants/colorWidget');
var colorWidgetDefaults = require('../constants/defaults').colorWidget;

var _color;

var ColorWidgetStore = new Store({

  // Gets data associated with the current user.
  get: function() {
    return _color || colorWidgetDefaults;
  }

});

ColorWidgetStore.dispatcherToken = Dispatcher.register(function(payload) {

  var action = payload.action;

  if (action.actionType === colorWidgetConstants.SET_CURRENT_USER) {
    _color = action.color;

    ColorWidgetStore.emitChange();
  }

});

module.exports = ColorWidgetStore;
