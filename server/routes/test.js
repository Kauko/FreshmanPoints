/**
 * Test Routes
 */

'use strict';

var testController = require('../controllers/test')

var routes = function(app) {

  app.get('/test', testController.test)

};

module.exports = routes;
