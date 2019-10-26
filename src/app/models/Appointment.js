module.exports = (sequelize, Datatypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: Datatypes.DATE,
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { forignkey: 'user_id' });
    Appointment.belongsTo(models.User, { forignkey: 'provider_id' });
  };

  return Appointment;
};
