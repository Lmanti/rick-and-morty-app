const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Location = sequelize.define('Location', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: 'Locations',
        timestamps: false,
    });

    Location.associate = (models) => {
        Location.hasMany(models.Character, { foreignKey: 'locationId', as: 'residents' });
        Location.hasMany(models.Character, { foreignKey: 'originId', as: 'natives' });
    };

    return Location;
};