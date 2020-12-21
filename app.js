'use strict'
    var express = require('express');
    var bodyParser = require('body-parser');
    var categorias_routes = require('./routes/categorias.route');
    var productos_routes = require('./routes/productos.route');

    var app = express();

    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json())

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    var router = express.Router();
    router.use('/api', categorias_routes);
    router.use('/api', productos_routes);
    app.use(router);
module.exports = app;