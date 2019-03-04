'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Achats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
              model: 'Users',
              key: 'id'
          }
      },
      idForf: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
              model: 'Forfaits',
              key: 'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Achats');
  }
};