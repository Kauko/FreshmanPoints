var Dispatcher = require('../dispatchers/default');
var request = require('superagent');

module.exports = {

	getUsers: function(callback) {
		var self = this;
		request
		.get('/userevents.json')
		.type('json')
		.end(function(this.refs){
			callback.success(res.body);
		});
		},

		
	}
}