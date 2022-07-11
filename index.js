const express = require('express');
const cors = require('cors');
const path = require('path') 
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

//manejar demas rutas
//este codigo fue insertado para poder manejar las rutas una vez que al applicacion de angular ya fue copiada en la carpeta public 
app.get('*',(req,res) =>{
res.sendFile(path.resolve(__dirname,'public/index.html'))
})

//configuracion del puerto en el que trabajara el servidor
app.listen(process.env.PORT, () =>{
    console.log(`el servidor corre en el puerto ${process.env.PORT}`)
})
