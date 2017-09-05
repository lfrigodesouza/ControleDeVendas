'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Inicia a aplicação apontando para o ExpressJS
// Depois adiciona o uso do bodyParser para melhorar 
// o tratamento do body dos requests e também para remover o encoding
// das urls
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Conecta com o MongoDB
mongoose.connect('mongodb://sa:sa@ds036967.mlab.com:36967/ndstr');

// Modelos

// Declaração das Rotas para os Controllers
const indexRoute = require('./routes/index-route');

// Uso das rotas dos Controllers
 app.use('/', indexRoute);

// Rotas para os HTMLs
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

module.exports = app;
