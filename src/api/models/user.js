'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    idCat: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
      models.User.belongsTo(models.Categorie, {
        foreignKey:{
          allowNull: false,
        }
      });
      models.User.hasMany(models.Achat);
      models.User.hasMany(models.Reservation);
      models.User.hasMany(models.Participation);
  };
  return User;
};