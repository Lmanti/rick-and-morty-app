const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Status = sequelize.define('Status', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'Statuses',
        timestamps: false
    });

    Status.associate = (models) => {
        Status.hasMany(models.Character, { foreignKey: 'statusId', as: 'characters' });
    };

    return Status;
};