'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cliente-controller');
const path = require('path');

router.get('/cliente-edit', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/cliente-edit.html'));
});
router.get('/cliente-edit/:id', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/cliente-edit.html'));
});
router.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/cliente.html'));
});
router.post('/', controller.post);
router.get('/BuscaClientePorTel/:telprincipal', controller.BuscaClientePorTel);
router.get('/buscaClientes/:pPage', controller.buscaClientes);
router.get('/buscaClienteById/:id', controller.buscaClienteById);
router.get('/QtdTotalClientes', controller.QtdTotalClientes);
router.put('/', controller.put);
module.exports = router;
