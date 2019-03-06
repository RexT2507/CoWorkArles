'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    dateDeb: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    idUser: DataTypes.INTEGER,
    idLieu: DataTypes.INTEGER
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
      models.Reservation.belongsTo(models.User, {
          foreignKey:'id'
      });

      models.Reservation.belongsTo(models.Lieu, {
          foreignKey:'id'
      })
  };
  return Reservation;
};