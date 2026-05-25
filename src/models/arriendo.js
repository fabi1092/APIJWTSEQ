const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Arriendo = sequelize.define('Arriendo', {
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    precioDia: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01 // Regla 3: Mayor que cero
      }
    },
    estado: {
      type: DataTypes.ENUM('activo', 'finalizado'),
      defaultValue: 'activo'
    }
  }, {
    tableName: 'arriendos',
    timestamps: true
  });

  return Arriendo;
};