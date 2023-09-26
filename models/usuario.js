const { DataTypes } = require("sequelize");
const db = require("../db/connection");

//definiendo el modelo del usuario
const Usuario = db.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

module.exports = Usuario;
