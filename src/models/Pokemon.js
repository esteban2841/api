const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{

      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true

    },  
    name: {

      type: DataTypes.STRING,

    },
    img:{
      type : DataTypes.STRING,
      defaultValue: "https://i.servimg.com/u/f60/14/90/93/75/pokemo22.png"
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue:50
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue:50
    },
    defense: {
      defaultValue:50,
      type: DataTypes.INTEGER,
    },
    speed: {
      defaultValue:50,
      type: DataTypes.INTEGER,
    },
    height:{
      type: DataTypes.INTEGER,
    },
    weight:{
      type: DataTypes.INTEGER,
  
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  
};
