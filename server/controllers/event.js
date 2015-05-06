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
    title: 'WCOjkkjK',
    description: 'Heitellään palikoita',
    date: '2014-10-10',
    points: 100,
    image: 'images/KappaHD.jpg'
  };
  //Tällä voi lisätä rivejä kantaan jos pitää tauluja droppailla
  //Event.create(event)

  //tämä tarkistus pitää muuttaa jotenki järkeväksi 
  if (typeof req.body.userid === 'undefined'){
    console.log('Event Controller :: Ei olla kirjauduttu');
    Event.findAll()
      .success(function(events){
        res.status(200).json(events);
      });
  }else{
    //tämä on varmaan vähän tyhmä tapa toteuttaa tämä
    //en vaan saa sequelizella järkevästi yhteen sarakkeeseen ilmottautumistietoa
    var customquery = 'SELECT "events"."id"'
    customquery += ',"events"."title"'
    customquery += ',"events"."description"'
    customquery += ',"events"."date"'
    customquery += ',"events"."image"'
    customquery += ',EXISTS ( '
    customquery +=   'SELECT id '
    customquery +=   'FROM "userEvents" '
    customquery +=   'WHERE "eventId" = "events".id '
    customquery +=   'AND "userId" = :userid ) AS signedup '
    customquery += 'FROM "events" '

    db.sequelize.query(
      customquery.replace(':userid', req.body.userid)
      ).success(function(data){
        //console.log(data);
        res.status(200).json(data);
    });
  };
};

//tällä saa yhen eventin hyväksymättömät ilmoitukset
//eventtihaun tulokset pitäs loopata läpi
// ja lisätä tämän haun tulokset palautettavaan jsoniin
var sql = 'select "userEvents".id'
sql += '  , "userEvents"."userId"'
sql += '  , users."firstName"'
sql += '  , users."lastName"'
sql += '  , users."nickName"'
sql += '  , users."email"'
sql += ' from "userEvents"'
sql += ' inner join users on "userEvents"."userId" = users.id'
sql += ' where "userEvents"."eventId" = :eventId'
sql += ' and "userEvents"."confirmDate" IS NULL'


//tällä kyselyllä saa datat scoreboardiin järjestettynä isoimmasta päästä
//varmaan järkevää lisätä joku limitti että ei hae ihan kaikkien tietoja
//pitää lisätä tarkistus että käyttäjä on fuksi

// 'select sum(points) as points '
// ', "userEvents"."userId" '
// ', "users"."firstName" '
// ', "users"."lastName" '
// ', "users"."email" '
// ', "users"."nickName" '
// 'from "events" '
// 'inner join "userEvents" on "events".ID = "userEvents"."eventId" '
// 'inner join "users" on "users".Id = "userEvents"."userId" '
// 'group by "userEvents"."userId", "users"."firstName" '
// ', "users"."lastName", "users"."email", "users"."nickName" '
// 'order by sum(points) desc '

var deleteEvent = function (req, res, next) {
  //TODO: tapahtuman poisto
  //console.log('poisteltasko vähä tapahtumia');
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
                //ei toimi oikeen koska on loopin sisällä
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

var createEvent = function (req, res, next) {
 
var event = {
    title: req.body.Title,
    description: req.body.Description,
    date: req.body.Date,
    image: req.body.Image
  };

  console.log(event);
  Event.create(event);
  

};

module.exports = {
  eventsPage: eventsPage,
  eventList: eventList,
  deleteEvent: deleteEvent,
  addParticipation: addParticipation,
  createEvent: createEvent
};