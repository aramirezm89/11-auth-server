const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth.controller");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//crear un nuevo usuario
router.post(
  "/new",
  [
    check("name", "Nombre es obligatorio").not().isEmpty(),
    check("email", "Email no valido").isEmail(),
    check("password","Password debe contener por lo menos 6 caracteres").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

//login de usuario
router.post(
  "/",
  [
    check("email", "El email no es valido").isEmail(),
    check("password", "El password debe tener por lo menos 6 caracteres").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

//validar y revalidar token

router.get("/renew", revalidarToken);

module.exports = router;
