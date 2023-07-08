const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }
  );

  Service.associate = (models) => {
    Service.belongsTo(models.Provider, { foreignKey: 'providerId' });
    Service.hasMany(models.Appointment, { foreignKey: 'serviceId' });
  };

  return Service;
};
