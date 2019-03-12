'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lieu = sequelize.define('Lieu', {
    libelle: DataTypes.STRING,
    prix: DataTypes.INTEGER,
      actif: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE
  }, {});
  Lieu.associate = function(models) {
    // associations can be defined here
      models.Lieu.hasMany(models.LieuEvent);
      models.Lieu.hasMany(models.Evenement);
  };
  return Lieu;
};