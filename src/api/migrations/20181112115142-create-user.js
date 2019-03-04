'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCat: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references:{
            model: "Categories",
              key: "id"
          }
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
        image: {
            allowNull: true,
            type: Sequelize.STRING
        },
        adresse: {
            allowNull: true,
            type: Sequelize.STRING
        },
        ville: {
            allowNull: true,
            type: Sequelize.STRING
        },
        tel: {
            allowNull: true,
            type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};