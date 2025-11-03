const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        characterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Characters', key: 'id' }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'Comments',
        timestamps: true
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Character, { foreignKey: 'characterId', as: 'character' });
    };

    return Comment;
};