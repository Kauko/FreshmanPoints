'use strict';

var Dispatcher = require('../dispatchers/default');
var request = require('superagent');

module.exports = {

	getUserEvents: function(userId, callback) {
		var self = this;
		request
			.get('/scoreboard.json')
			.type('json')
			.end(function(res){
				console.log(res.body);
				callback.success(res.body);
			});
		},	
};

