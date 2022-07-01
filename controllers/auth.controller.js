/*las funcion creadas en este controlador son exportaddas e importadas
en el archivo de rutas 
*/
const { validationResult } = require("express-validator");

const crearUsuario = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  return res.json({
    ok: true,
    message: "Crear Usuario new",
  });
};

const loginUsuario = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  const { email, password } = req.body;
  console.log(email, password);
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
