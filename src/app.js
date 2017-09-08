'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Inicia a aplicação apontando para o ExpressJS
// Depois adiciona o uso do bodyParser para melhorar 
// o tratamento do body dos requests e também para remover o encoding
// das urls
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Define o caminho para os estilos, scripts e estilos
app.use(express.static(__dirname + '/public'));

// Conecta com o MongoDB
mongoose.connect('mongodb://sa:sa123@ds036967.mlab.com:36967/ctrlvendas', {
    useMongoClient: true,
});

// Modelos
const cliente = require('./models/cliente-model');
const produto = require('./models/produto-model');
const pedido = require('./models/pedido-model');

// Declaração das Rotas para os Controllers
const indexRoute = require('./routes/index-route');
const clienteRoute = require('./routes/cliente-route');
const produtoRoute = require('./routes/produto-route');
const pedidoRoute = require('./routes/pedido-route');

// Uso das rotas dos Controllers
 app.use('/', indexRoute);
 app.use('/cliente', clienteRoute);
 app.use('/produto', produtoRoute);
 app.use('/pedido', pedidoRoute);

module.exports = app;
