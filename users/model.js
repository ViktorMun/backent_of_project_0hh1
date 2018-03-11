const Sequelize = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('Users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: Sequelize.STRING
}, {
  tableName: 'Users',
  timestamps: false
})


module.exports = Users
