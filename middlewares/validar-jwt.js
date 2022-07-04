const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) =>{
  //recupero el valor del token que viene en el header de la request mediante el nombre del header
  const token = req.header("x-token");

  //esta validacion sirve para ver si el existe el header con el token
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Error en el token",
    });
  }

  //
  try {
    /*verifica que el token tenga la firma correspondiente, en caso de ser correcta devuelve un objeto (payload)
          en este caso el payload contiene las propiedades {uid, name};
        */
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    //estas propiedades seran añadidas a la request que llegara al controlador
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token no valido",
    });
  }

  //todo bien

  next();
}

module.exports = {
    validarJWT
}