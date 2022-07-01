const { Schema,model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
});

/*
    para exportar el schema se usa la funcion model() de mongoose en la cual el primer argumento,
    es el nombre (singular, ya que monggose al crearlo lo dejara en plural), y el segundo argumento
    sera el schama creado.
*/
module.exports = model('Usuario',UsuarioSchema)