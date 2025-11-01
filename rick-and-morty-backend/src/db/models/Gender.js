const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Gender = sequelize.define('Gender', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Genders',
    timestamps: false
  });

  Gender.associate = (models) => {
    Gender.hasMany(models.Character, { foreignKey: 'genderId', as: 'characters' });
  };

  return Gender;
};