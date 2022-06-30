const {Router} = require('express')

const router = Router();


//crear un nuevo usuario
router.post('/new',(req,res) =>{
    return res.json({
        ok:true,
        message:'Crear Usuario new'
    })
})

//login de usuario
router.post("/", (req, res) => {
  return res.json({
    ok: true,
    message: "login de usuario /",
  });
});


//validar y revalidar token

router.get("/renew", (req, res) => {
  return res.json({
    ok: true,
    message: "Renew",
  });
});


module.exports = router;