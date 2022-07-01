const express = require('express');
const cors = require('cors');
require('dotenv').config();//esto sirve para cargar las variables de entorno del archivo .env ubicado raiz del proyecto


//creacion del servidor/aplicacion de express
const app = express();

//Directorio publico
app.use(express.static('./public'));

//cors
app.use(cors())

//lectura y parseo del body
app.use(express.json());

/*
    para configuar las rutas que se encuentran en otro archivo utilizo
    use()
*/
app.use('/api/auth', require('./routes/auth.routes'))

app.listen(process.env.PORT, () =>{
    console.log(`el servidor corre en el puerto ${process.env.PORT}`)
})
