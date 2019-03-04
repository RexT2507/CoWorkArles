'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Participations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idEvent: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                    model: "Evenements",
                    key: "id"
                }
            },
            idUser: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                    model: "Users",
                    key: "id"
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
        return queryInterface.dropTable('Participations');
    }
};