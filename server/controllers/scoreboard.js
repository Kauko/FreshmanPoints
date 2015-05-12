'use strict';

var path = require('path');
var db = require('../config/database');
var UserEvent = db.userEvent;
var settings = require('../config/env/default');

var scoreboardPage = function(req, res) {
    // Render index.html to allow application to handle routing
  res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};


var userEventList = function(req, res) {

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
  customquery += 'limit 25'
 
  db.sequelize.query(
      customquery
      ).success(function(data){
        console.log(data);
        res.status(200).json(data);
  });
};


module.exports = {
  scoreboardPage: scoreboardPage,
  userEventList: userEventList
};