const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./DB/config');
require('dotenv').config();//esto sirve para cargar las variables de entorno del archivo .env ubicado raiz del proyecto


 
//creacion del servidor/aplicacion de express
const app = express();

//bd connection
dbConnection();

//Directorio publico
app.use(express.static('./public'));

//lectura y parseo del body
app.use(express.json());

/*
    para configuar las rutas que se encuentran en otro archivo utilizo
    use()
*/

//cors
app.use(cors());


app.use('/api/auth', require('./routes/auth.routes'))

app.listen(process.env.PORT, () =>{
    console.log(`el servidor corre en el puerto ${process.env.PORT}`)
})
