'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('LieuEvents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            dateDeb: {
                allowNull: false,
                type: Sequelize.DATE
            },
            dateFin: {
                allowNull: false,
                type: Sequelize.DATE
            },
            idLieu: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                    model: "Lieus",
                    key: "id"
                }
            },
            idEvent: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references:{
                    model: "Evenements",
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
        return queryInterface.dropTable('LieuEvents');
    }
};