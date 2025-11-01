'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Genders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        });

        await queryInterface.addColumn('Characters', 'genderId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Genders',
                key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });

        await queryInterface.removeColumn('Characters', 'gender');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Characters', 'gender', {
            type: Sequelize.STRING
        });
        
        await queryInterface.removeColumn('Characters', 'genderId');
        await queryInterface.dropTable('Genders');
    }
};