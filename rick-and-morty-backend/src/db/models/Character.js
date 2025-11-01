const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Character = sequelize.define('Character', {
        rmId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING
        },
        species: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        origin: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        episodeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'Characters',
        timestamps: true
    });

    return Character;
};