'use strict';

var Dispatcher = require('../dispatchers/default');
var request = require('superagent');

module.exports = {

	getUserEvents: function(userId, callback) {
		var self = this;
		request
			.get('/userevents.json')
			.type('json')
			.send({userid: userID})
			.end(function(refs){
				callback.success(res.body);
			});
		},	
};

