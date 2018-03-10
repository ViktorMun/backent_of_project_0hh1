'use strict';
module.exports = (sequelize, DataTypes) => {
  var Games = sequelize.define('Games', {
    game: DataTypes.STRING,
    board: DataTypes.STRING,
    locked: DataTypes.STRING
  }, {});
  Games.associate = function(models) {
    // associations can be defined here
  };
  return Games;
};
