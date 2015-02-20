'use strict';

var Dispatcher = require('../dispatchers/default');
var userConstants = require('../constants/user');
var messagesActions = require('./messages');
var routeActions = require('./routes');
var userDefaults = require('../constants/defaults').user;
var request = require('superagent');
var serialize = require('form-serialize');
var cookie = require('cookie');

module.exports = {

  getColor : function(callback){
    var self = this;
    request
      .get('/color')
      .type('json')
      .end(function(res){
        if(res.ok){
          if (callback && callback.success) {
            callback.success(res);
          }
        }else {
          self.logout();
          if (callback && callback.error) {
            callback.error(res);
          }
        }

        if (callback && callback.complete) {
          callback.complete(res);
        }
      });
  },

  changeColor : function(callback){
    var self = this;
    request
      .post('/color')
      .type('json')
      .end(function(res){
        if(res.ok){
          if (callback && callback.success) {
            callback.success(res);
          }
        }else {
          self.logout();
          if (callback && callback.error) {
            callback.error(res);
          }
        }

        if (callback && callback.complete) {
          callback.complete(res);
        }
      });
  }
};
