'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
      libelle: DataTypes.STRING,
      accreditation: DataTypes.INTEGER
  }, {});
  Categorie.associate = function(models) {
    // associations can be defined here
      models.Categorie.hasMany(models.User);
      models.Categorie.hasMany(models.Droit);
  };
  return Categorie;
};