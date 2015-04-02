var scoreboardController = require('../controllers/scoreboard');
var auth = require('../auth');

var routes = function(app) {
  app.get('/events', scoreboardController.scoreboardPage);
  app.post('/events.json', scoreboardController.userEventList);
};

module.exports = routes;