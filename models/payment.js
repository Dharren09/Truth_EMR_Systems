module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
      'Payment',
      {
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        // ... other attributes specific to payments
      }
    );
  
    Payment.associate = (models) => {
      Payment.belongsTo(models.Appointment, { foreignKey: 'appointmentId' });
    };
  
    return Payment;
  };
  