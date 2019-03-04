'use strict';
module.exports = (sequelize, DataTypes) => {
  const Achat = sequelize.define('Achat', {
    idUser: DataTypes.INTEGER,
    idForf: DataTypes.INTEGER
  }, {});
  Achat.associate = function(models) {
    // associations can be defined here
      models.Achat.belongsTo(models.User, {
          foreignKey:{
              allowNull: false,
          }
      });
      models.Achat.belongsTo(models.Forfait, {
          foreignKey:{
              allowNull: false,
          }
      });
  };
  return Achat;
};