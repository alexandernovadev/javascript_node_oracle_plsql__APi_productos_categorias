'use strict'

var app = require('./app');

var port = process.env.PORT || 3999;        

// Crear el Servidor
app.listen(port, ()=>
{
    console.log("The Server http://localhost:3999 esta funcionando \n\n");


});