'use strict'

var express = require('express');
var productosController = require('../controllers/productosController');
var router = express.Router();


router.get('/getproductobyidcategoria/:idcat', productosController.getProductoby_idcategoria);  


// router.get('/categorias', categoriasController.getcategorias);  


module.exports = router;