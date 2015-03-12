/**
 * Auth Routes
 */

'use strict';

var accountController = require('../controllers/account');
var auth = require('../auth');

var routes = function(app) {
  // Account
  app.get('/login', accountController.login);
  app.post('/login', accountController.postLogin);
  app.get('/forgot', accountController.forgot);
  app.post('/forgot', accountController.postForgot);
  app.get('/reset/:token', accountController.reset);
  app.post('/reset/:token', accountController.postReset);
  app.get('/signup', accountController.signup);
  app.get('/settings', accountController.settings);
<<<<<<< HEAD
  app.get('/scoreboard', accountController.scoreboard);
=======
  app.get('/greetings', accountController.greetings);
  app.get('/events', accountController.events);
>>>>>>> testings/tuomas
};

module.exports = routes;
