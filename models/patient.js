module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define(
      'Patient',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM('male', 'female'),
          allowNull: false,
        },
        contact: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dob: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        age: {
          type: DataTypes.VIRTUAL,
          get() {
            const dob = this.getDataValue('dob');
            if (dob) {
              const today = new Date();
              const birthDate = new Date(dob);
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              return age;
            }
            return null;
          },
        },
      },
      {
        timestamps: true,
      }
    );
  
    Patient.associate = (models) => {
      Patient.belongsTo(models.User, { foreignKey: 'userId' });
      Patient.hasMany(models.Appointment, { foreignKey: 'patientId' });
    };
  
    return Patient;
};
  