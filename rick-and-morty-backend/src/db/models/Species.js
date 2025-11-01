const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Species = sequelize.define('Species', {
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
    }, {
        tableName: 'Species',
        timestamps: false,
    });

    Species.associate = (models) => {
        Species.hasMany(models.Character, { foreignKey: 'speciesId', as: 'characters' });
    };

    return Species;
};