'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
