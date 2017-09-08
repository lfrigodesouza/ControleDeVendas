'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedido-controller');
const path = require('path');

router.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/pedido.html'));
});
router.post('/', controller.post);
router.get('/BuscaClientePorTel/:telprincipal', controller.BuscaClientePorTel);
router.get('/BuscaProdutoPorCodigo/:codigoproduto'
    , controller.BuscaProdutoPorCodigo);
router.get('/buscaPedidosPendentes', controller.buscaPedidosPendentes);
module.exports = router;
