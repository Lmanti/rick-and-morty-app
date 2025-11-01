'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Species', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            }
        });

        await queryInterface.addColumn('Characters', 'speciesId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Species',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });

        await queryInterface.removeColumn('Characters', 'species');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('Characters', 'species', {
            type: Sequelize.STRING
        });

        await queryInterface.removeColumn('Characters', 'speciesId');
        await queryInterface.dropTable('Species');
    }
};