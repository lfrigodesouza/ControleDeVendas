'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');
const path = require('path');

router.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/produto.html'));
});
router.get('/produto-edit', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/produto-edit.html'));
});
router.get('/produto-edit/:id', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/produto-edit.html'));
});
router.post('/', controller.post);
router.get('/BuscaProdutoPorCodigo/:codigoproduto'
, controller.BuscaProdutoPorCodigo);
router.get('/buscaProdutos', controller.buscaProdutos);
router.get('/buscaProdutoById/:id', controller.buscaProdutoById);
router.put('/', controller.put);
module.exports = router;
