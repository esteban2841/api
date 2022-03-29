const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{

      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true

    },
    name: {

      type: DataTypes.STRING,
      allowNull: false,

    },
    img:{
      type : DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://i.servimg.com/u/f60/14/90/93/75/pokemo22.png"
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  });
  
};
