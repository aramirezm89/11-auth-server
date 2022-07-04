/*las funcion creadas en este controlador son exportaddas e importadas
en el archivo de rutas 
*/

const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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
    const token = await generarJWT(usuario.id,name);
    //crear usuario en la BD

    usuario.save();

    //generar respuesta exitosa

    return res.status(200).json({
      ok: true,
      uid: usuario.id,
      name,
      message: "Usuario creado exitosamente",
      token
    });



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error del servidor, comuniquese con el administrador.",
    });
  }
};

const loginUsuario = async (req, res) => {

  const { email, password } = req.body;

  try {

    const usurioBD = await Usuario.findOne({email});

    if(!usurioBD){
      return res.status(400).json({
        ok:false,
        message:'Credenciales de usuario no validas'
      })
    }

    //confimar que el password hace match

    const validPassword = bcrypt.compareSync(password,usurioBD.password);

    if(!validPassword){
       return res.status(400).json({
         ok: false,
         message: "El password no es valido",
       });
    }

    //Generar jsonWebToken

    const token = await generarJWT(usurioBD.id,usurioBD.name);

    //respuesta del servicio

    return res.json({
      ok:true,
      uid:usurioBD.id,
      name:usurioBD.name,
      token,
      message:'Bienvenido'
    })


    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok:false,
      message:'Hable con el administrador'
    })
  }

};

const revalidarToken = async (req, res) => {

  //{uid y name} son propiedades añadidas en la funcion de validar-jwt al pasar el validacion en true estas son ñadidas.
 const {uid,name} = req

 const token = await generarJWT(uid,name)
  return res.json({
    ok: true,
    message: "Renew",
    uid,
    name,
    token
   
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
