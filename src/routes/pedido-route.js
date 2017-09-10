'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedido-controller');
const path = require('path');

router.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/pedido.html'));
});
router.post('/', controller.post);
router.get('/buscaPedidosPendentes', controller.buscaPedidosPendentes);
router.put('/atualizaPedido', controller.atualizaPedido);
router.put('/cancelarPedido', controller.cancelarPedido);
router.put('/entregarPedido', controller.entregarPedido);
module.exports = router;
