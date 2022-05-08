const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    Id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    score:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.FLOAT
    },
    steps:{
      type: DataTypes.TEXT
    },
      image:{
       type: DataTypes.STRING
      }
  });
};
