const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth.controller");

const router = Router();

//crear un nuevo usuario
router.post("/new", crearUsuario);
//login de usuario
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener por lo menos 6 caracteres").isLength({min:6}),
  ],
  loginUsuario
);

//validar y revalidar token

router.get("/renew", revalidarToken);

module.exports = router;
