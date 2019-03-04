'use strict';
module.exports = (sequelize, DataTypes) => {
  const LieuEvent = sequelize.define('LieuEvent', {
    dateDeb: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    idLieu: DataTypes.INTEGER,
    idEvent: DataTypes.INTEGER
  }, {});
  LieuEvent.associate = function(models) {
    // associations can be defined here
      models.LieuEvent.belongsTo(models.Lieu, {
          foreignKey:{
              allowNull: false,
          }
      });

      models.LieuEvent.belongsTo(models.Evenement, {
          foreignKey:{
              allowNull: false,
          }
      })
  };
  return LieuEvent;
};