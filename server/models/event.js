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
    date: {
      type: DataTypes.DATE
      
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'images/KappaHD.jpg'
    }
  });

  //Event.sync()
  //Event.sync({ force:true })

  return Event;
};

module.exports = EventModel;
