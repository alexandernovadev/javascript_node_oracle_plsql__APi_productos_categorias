'use strict'

var express = require('express');
var categoriasController = require('../controllers/categoriaController');
var router = express.Router();


router.get('/getCategoriaMaxMin', categoriasController.getMinMax);  


router.get('/categorias', categoriasController.getcategorias);  
router.get('/categoria/:id', categoriasController.getcategoriasbyid);  
router.get('/categoriabyrank/:num', categoriasController.getCategoriabyRanknum);  
router.post('/save_categoria', categoriasController.save_categoria);  
router.delete('/delete_categoria/:id', categoriasController.delete_categoria);  
router.put('/update_categoria/:id', categoriasController.update_categoria);  
// router.post('/save', ArticleController.save); 

module.exports = router;