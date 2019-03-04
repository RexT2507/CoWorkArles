'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Droits', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      idCat: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: 'Categories',
              key: 'id'
          }
      },
        numeroDroit: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
              model: 'TypeDroits',
              key: 'numero'
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
    return queryInterface.dropTable('Droits');
  }
};