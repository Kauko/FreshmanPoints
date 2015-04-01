'use strict';

var UserEventModel = function(sequelize, DataTypes) {
  var UserEvent = sequelize.define('userEvent', {
    confirmDate: DataTypes.DATE,
    confirmUserId: DataTypes.INTEGER,
    userId: {
     	type: DataTypes.INTEGER,
        references: 'users', // <<< Note, its table's name, not object name
        referencesKey: 'id' // <<< Note, its a column name
    },
    eventId: {
    	type: DataTypes.INTEGER,
    	references: 'events',
    	referencesKey: 'id'
    }
  });
  //UserEvent.sync({force: true});
  //UserEvent.sync();

  return UserEvent;
};

module.exports = UserEventModel;