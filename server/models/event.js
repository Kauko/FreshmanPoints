'use strict';

var EventModel = function(sequelize, DataTypes) {
  var Event = sequelize.define('event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'images/KappaHD.jpg'
    },
    points: DataTypes.INTEGER
  });

  //ei ilmeisesti näin
  //Event.belongsToMany(User);  

  //Event.sync();
  //Event.sync({ force:true })  

  return Event;
};

module.exports = EventModel;
