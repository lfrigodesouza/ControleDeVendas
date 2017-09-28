'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedido-controller');
const path = require('path');

router.get('/pedido-edit/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/pedido-edit.html'));
});
router.get('/pedido-edit/:id', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/pedido-edit.html'));
});
router.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/pedido.html'));
});
router.post('/', controller.post);
router.get('/buscaPedidosPendentes', controller.buscaPedidosPendentes);
router.put('/atualizaPedido', controller.atualizaPedido);
router.put('/cancelarPedido', controller.cancelarPedido);
router.put('/entregarPedido', controller.entregarPedido);
router.get('/buscaPedidosPorCliente/:id', controller.buscaPedidosPorCliente);
router.get('/buscaPedidos/:pPage', controller.buscaPedidos);
router.get('/qtdTotalPedidos', controller.qtdTotalPedidos);
router.get('/buscaPedidoById/:id', controller.buscaPedidoById);
router.put('/', controller.put);
module.exports = router;
