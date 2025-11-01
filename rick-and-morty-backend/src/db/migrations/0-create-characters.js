'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Characters', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        rmId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: Sequelize.STRING,
        species: Sequelize.STRING,
        type: Sequelize.STRING,
        gender: Sequelize.STRING,
        origin: Sequelize.STRING,
        location: Sequelize.STRING,
        image: Sequelize.STRING,
        episodeCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
        }
        });
    },

    down: async (queryInterface /*, Sequelize */) => {
        await queryInterface.dropTable('Characters');
    }
};