'use strict';

var path = require('path');
var db = require('../config/database');
var User = db.user;
var Event = db.event;
var UserEvent = db.userEvent;
var settings = require('../config/env/default');

var eventsPage = function(req, res) {
  // Render index.html to allow application to handle routing
  res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

var eventList = function(req, res) {
  var eventlistjson = [];

  var event = {
    title: 'Tässä ois kovakoodattu tapahtuma',
    description: 'oiskohan sielä kalijaa'
  };
  //Tällä voi lisätä rivejä kantaan jos pitää tauluja droppailla
  //Event.create(event)

  //tämä tarkistus pitää muuttaa jotenki järkeväksi 
  if (typeof req.body.userid === 'undefined'){
    console.log('ei olla kirjauduttu');
    Event.findAll()
      .success(function(events){
        res.status(200).json(events);
      });
  }else{
    //tämä on varmaan vähän tyhmä tapa toteuttaa tämä
    //en vaan saa sequelizella järkevästi yhteen sarakkeeseen ilmottautumistietoa
    var customquery = 
      'SELECT "events"."id"\
      ,"events"."title"\
      ,"events"."description"\
      ,"events"."image"\
      ,EXISTS (\
        SELECT id\
        FROM "userEvents" \
          WHERE "eventId" = "events".id \
          AND "userId" = :userid ) AS signedup \
      FROM "events" '

    db.sequelize.query(
      customquery.replace(':userid', req.body.userid)
      ).success(function(data){
        //console.log(data);
        res.status(200).json(data);
    });
  };
};

var deleteEvent = function (req, res, next) {
  console.log('poisteltasko vähä tapahtumia');
};

var addParticipation = function(req, res){
  //console.log(req.body);
  //kusee jos ei oo kirjautunu sisään, tarkistus pitäs tehä jotenki järkevästi
  if (typeof req.body.userid === 'undefined'){
    res.status(401);
  }else{
  
    UserEvent.count(
      { where: ['"eventId" = ? AND "userId" = ?', req.body.eventid, req.body.userid] }
    ).then(function(count){

      if(count > 0){      
        //poistetaan ilmottautuminen
        UserEvent.findAll({
          where: ['"eventId" = ? AND "userId" = ?', req.body.eventid, req.body.userid],
          attributes: ['id']
        }).success(function(userevents){

          userevents.forEach(function(userevent){
            UserEvent.destroy(userevent.dataValues.id)
              .success(function(){
                res.status(200);
              });
          });          
        });
      }else{
        //tehdään uusi
        var participation = {
          eventId: req.body.eventid,
          userId: req.body.userid
        };
        UserEvent.create(participation).success(function(){
          res.status(200);
        });
      }
    });
  };
};

module.exports = {
  eventsPage: eventsPage,
  eventList: eventList,
  deleteEvent: deleteEvent,
  addParticipation: addParticipation
};