const express = require('express');
//exportamos las rutas 
const router = require('./routes');
require('./config/db');
const bodyParser = require('body-parser');

//cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');



//creamos el servidor
const app = express();
 

//habilitamos bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//habilitamos cors
app.use(cors());


//asignamos un puerto a nuestro servidor
const port = process.env.PUERTO || 5000;

app.use('/', router());

//carpeta publica
app.use(express.static('uploads'));
 
//inicializamos nuestro servidor
app.listen(port,()=>{
    console.log(`El servidor  esta corriendo en el puerto ${port}`);
});

