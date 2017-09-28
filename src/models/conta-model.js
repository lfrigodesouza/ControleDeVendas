'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
    },
    valorTotal: {
        type: Number,
        required: true,
    },
    pedidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
    }],
});

module.exports = mongoose.model('Conta', schema);
