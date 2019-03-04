'use strict';
module.exports = (sequelize, DataTypes) => {
  const Droit = sequelize.define('Droit', {
    idCat: DataTypes.INTEGER,
    numeroDroit: DataTypes.INTEGER
  }, {});
  Droit.associate = function(models) {
    // associations can be defined here
      models.Droit.belongsTo(models.TypeDroit, {
        foreignKey: 'numero'
      });
      models.Droit.belongsTo(models.Categorie, {
        foreignKey:{
          allowNull: false
        }
      })
  };
  return Droit;
};