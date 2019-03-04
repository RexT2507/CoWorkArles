'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeDroit = sequelize.define('TypeDroit', {
    libelle: DataTypes.STRING,
      numero: DataTypes.INTEGER
  }, {});
  TypeDroit.associate = function(models) {
    // associations can be defined here
      models.TypeDroit.hasMany(models.Droit);
  };
  return TypeDroit;
};