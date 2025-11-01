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
        statusId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Statuses',
                key: 'id'
            }
        },
         speciesId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Species',
                key: 'id'
            }
        },
        type: {
            type: DataTypes.STRING
        },
        genderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Genders',
                key: 'id'
            }
        },
        originId: {
            type: DataTypes.INTEGER,
            references: { model: 'Locations', key: 'id' },
        },
        locationId: {
            type: DataTypes.INTEGER,
            references: { model: 'Locations', key: 'id' },
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

    Character.associate = (models) => {
        Character.belongsTo(models.Gender, { foreignKey: 'genderId', as: 'gender' });
        Character.belongsTo(models.Status, { foreignKey: 'statusId', as: 'status' });
        Character.belongsTo(models.Species, { foreignKey: 'speciesId', as: 'species' });
        Character.belongsTo(models.Location, { foreignKey: 'originId', as: 'origin' });
        Character.belongsTo(models.Location, { foreignKey: 'locationId', as: 'location' });
    };

    return Character;
};