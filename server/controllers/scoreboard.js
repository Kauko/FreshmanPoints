'use strict';

var path = require('path');
var db = require('../config/database');
var User = db.user;
var Event = db.event;
var UserEvent = db.userEvent;
var settings = require('../config/env/default');

var scoreboardPage = function(req, res) {
    // Render index.html to allow application to handle routing
  res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};


var userEventList = function(req, res) {
  var usereventlistjson = [];


  //Tällä voi lisätä rivejä kantaan jos pitää tauluja droppailla
  //Event.create(event)

  //tämä tarkistus pitää muuttaa jotenki järkeväksi 
  if (typeof req.body.userid === 'undefined'){
    console.log('Event Controller :: Ei olla kirjauduttu');
    UserEvent.findAll()
        .success(function(userevents){
        res.status(200).json(userevents);
        console.log(userevents)
    });
  }else{
  var customquery = 'select sum(points) as points '
  customquery += ', "userEvents"."userId" '
  customquery += ', "users"."firstName" '
  customquery += ', "users"."lastName" '
  customquery += ', "users"."email" '
  customquery += ', "users"."nickName" '
  customquery += 'from "events" '
  customquery += 'inner join "userEvents" on "events".ID = "userEvents"."eventId" '
  customquery += 'inner join "users" on "users".Id = "userEvents"."userId" '
  customquery += 'group by "userEvents"."userId", "users"."firstName" '
  customquery += ', "users"."lastName", "users"."email", "users"."nickName" '
  customquery += 'order by sum(points) desc '
  customquery += 'limit = 25'
 

  db.sequelize.query(
      customquery.replace(':userid', req.body.userid)
      ).success(function(data){
        //console.log(data);
        res.status(200).json(data);
    });
  };
};


module.exports = {
  scoreboard: scoreboardPage,
  userEventlist: userEventList
}