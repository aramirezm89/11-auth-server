/*las funcion creadas en este controlador son exportaddas e importadas
en el archivo de rutas 
*/

const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //verificar que no exista un email duplicado
    let usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        message: "Email ingresado ya existe en la base de datos",
      });
    }

    //crear usuario con el modelo creado en mongoose

    usuario = new Usuario(req.body);

    /*Hashear contraseña
      1:crar constante salt la cual tiene el hash
      2:tomar el password de la solicitud  y encriptar 
    */
   
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //generar el JWT

    //crear usuario en la BD

    usuario.save();

    //generar respuesta exitosa

    return res.status(200).json({
      ok: true,
      uid: usuario.id,
      name,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: true,
      message: "Error del servidor, comuniquese con el administrador.",
    });
  }
};

const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  return res.json({
    ok: true,
    message: "login de usuario /",
  });
};

const revalidarToken = (req, res) => {
  return res.json({
    ok: true,
    message: "Renew",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
