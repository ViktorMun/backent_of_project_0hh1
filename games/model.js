const Sequelize = require('sequelize')
const sequelize = require('../db')

const Games = sequelize.define('Games', {
  game: Sequelize.STRING,
  board: Sequelize.STRING,
  locked: Sequelize.STRING
}, {
  tableName: 'Games',
  timestamps: false
})


module.exports = Games
