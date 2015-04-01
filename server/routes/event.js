var eventController = require('../controllers/event');
var auth = require('../auth');

var routes = function(app) {
  app.get('/events', eventController.eventsPage);
  app.post('/events.json', eventController.eventList);
  app.delete('/events', auth.isAuthenticated, eventController.deleteEvent);
  app.post('/events', eventController.addParticipation);
};

module.exports = routes;