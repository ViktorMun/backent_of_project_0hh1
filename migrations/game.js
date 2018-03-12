'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game: {
          type: Sequelize.STRING,
          allowNull: true
        },
      board: {
          type: Sequelize.STRING,
          allowNull: true
          },
      locked: {
          type: Sequelize.STRING,
          allowNull: true
          },
        sidebar: {
          type: Sequelize.STRING,
          allowNull: true
              },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Games');
  }
};
