'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Statuses', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        });

        await queryInterface.addColumn('Characters', 'statusId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Statuses',
                key: 'id'
            },
            allowNull: true
        });

        await queryInterface.removeColumn('Characters', 'status');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Characters', 'status', {
            type: Sequelize.STRING
        });

        await queryInterface.removeColumn('Characters', 'statusId');
        await queryInterface.dropTable('Statuses');
    }
};