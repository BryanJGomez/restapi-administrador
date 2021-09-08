const mongoose = require('mongoose');

//configuracion para entrar a la db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//si hay un error mostrarlo por consola
mongoose.connection.on('error',(error)=>{
    console.log(error);
});

//importamos los modelos
require ('../models/Clientes');
require('../models/Productos');
require('../models/Pedidos');