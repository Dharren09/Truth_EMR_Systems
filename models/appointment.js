module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define(
      'Appointment',
      {
        appointmentDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        // ... other attributes specific to appointments
      }
    );
  
    Appointment.associate = (models) => {
      Appointment.belongsTo(models.Service, { foreignKey: 'serviceId' });
      Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
      Appointment.hasOne(models.Payment, { foreignKey: 'appointmentId' });
    };
  
    return Appointment;
  };
  