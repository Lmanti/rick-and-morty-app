'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Locations', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        });

        await queryInterface.addColumn('Characters', 'locationId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Locations',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });

        await queryInterface.addColumn('Characters', 'originId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Locations',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });

        await queryInterface.removeColumn('Characters', 'location');
        await queryInterface.removeColumn('Characters', 'origin');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('Characters', 'location', {
            type: Sequelize.STRING
        });
        await queryInterface.addColumn('Characters', 'origin', {
            type: Sequelize.STRING
        });

        await queryInterface.removeColumn('Characters', 'locationId');
        await queryInterface.removeColumn('Characters', 'originId');
        await queryInterface.dropTable('Locations');
    }
};