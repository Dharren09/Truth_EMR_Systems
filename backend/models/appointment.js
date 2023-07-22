module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define(
      'Appointment',
      {
        appointmentDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        additionalInfo: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      }
    );
  
    Appointment.associate = (models) => {
      Appointment.belongsTo(models.Service, { foreignKey: 'serviceId'});
      Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
      Appointment.hasOne(models.Payment, { foreignKey: 'appointmentId' });
      Appointment.belongsTo(models.Provider, { foreignKey: 'providerId' });
    };
  
    return Appointment;
  };
  