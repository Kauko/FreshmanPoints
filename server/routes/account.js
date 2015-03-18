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
  app.get('/events', accountController.greetings);
  app.get('/events.json', accountController.events);

  app.delete('/events',  auth.isAuthenticated, accountController.deleteEvent);
  app.post('/events', accountController.addParticipation);
};

module.exports = routes;
