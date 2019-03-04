'use strict';
module.exports = (sequelize, DataTypes) => {
  const Evenement = sequelize.define('Evenement', {
    adresseEvent: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Evenement.associate = function(models) {
    // associations can be defined here
      models.Evenement.hasMany(models.Participation);
      models.Evenement.hasMany(models.LieuEvent);
  };
  return Evenement;
};