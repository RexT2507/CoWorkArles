'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Forfaits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nbrCredit: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      libelle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prix: {
        sallowNull: false,
        type: Sequelize.DOUBLE
      },
        actif: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
      createdAt: {
        allowNull: false,
          primaryKey: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Forfaits');
  }
};