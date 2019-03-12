'use strict';
module.exports = (sequelize, DataTypes) => {
  const Forfait = sequelize.define('Forfait', {
    nbrCredit: DataTypes.INTEGER,
    libelle: DataTypes.STRING,
      actif: DataTypes.BOOLEAN,
    prix: DataTypes.DOUBLE
  }, {});
  Forfait.associate = function(models) {
    // associations can be defined here
      models.Forfait.hasMany(models.Achat);
  };
  return Forfait;
};