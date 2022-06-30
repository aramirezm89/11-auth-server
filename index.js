const express = require('express')

const app = express();

//Rutas

/*
    para configuar las rutas que se encuentran en otro archivo utilizo
    use()
*/
app.use('/api/auth', require('./routes/auth'))

app.listen(4000, () =>{
    console.log(`el servidor corre en el puerto ${4000}`)
})
