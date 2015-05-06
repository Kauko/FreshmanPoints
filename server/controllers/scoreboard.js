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
  'select sum(points) as points '
  ', "userEvents"."userId" '
  ', "users"."firstName" '
  ', "users"."lastName" '
  ', "users"."email" '
  ', "users"."nickName" '
  'from "events" '
  'inner join "userEvents" on "events".ID = "userEvents"."eventId" '
  'inner join "users" on "users".Id = "userEvents"."userId" '
  'group by "userEvents"."userId", "users"."firstName" '
  ', "users"."lastName", "users"."email", "users"."nickName" '
  'order by sum(points) desc '
  }
};


module.exports = {
	scoreboard: scoreboardPage,
	userEventlist: userEventList
}