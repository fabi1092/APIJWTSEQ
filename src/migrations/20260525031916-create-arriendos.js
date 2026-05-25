'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('arriendos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaInicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fechaFin: {
        type: Sequelize.DATE
      },
      precioDia: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: 'activo'
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes', // Nombre de la tabla
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      autoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'autos', // Nombre de la tabla
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('arriendos');
  }
};
