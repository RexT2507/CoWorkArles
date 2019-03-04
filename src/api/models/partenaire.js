'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partenaire = sequelize.define('Partenaire', {
    site: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {});
  Partenaire.associate = function(models) {
    // associations can be defined here
  };
  return Partenaire;
};