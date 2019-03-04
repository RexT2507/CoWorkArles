'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participation = sequelize.define('Participation', {
    idEvent: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {});
  Participation.associate = function(models) {
    // associations can be defined here
      models.Participation.belongsTo(models.Evenement, {
          foreignKey:{
              allowNull: false,
          }
      });

      models.Participation.belongsTo(models.User, {
          foreignKey:{
              allowNull: false,
          }
      });
  };
  return Participation;
};