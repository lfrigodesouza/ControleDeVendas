'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        require: [true, 'Todo pedido precisa de um cliente'],
        index: true,
    },
    metodopagamento: {
        type: String,
        require: true,
        enum: ['Dinheiro', 'Sodexo', 'VR', 'Débito', 'Crédito', 'Fiado'],
    },
    datapedido: {
        type: Date,
        require: true,
    },
    dataentrega: {
        type: Date,
    },
    entregue: {
        type: Boolean,
        default: false,
    },
    valortotal: {
        type: Number,
        require: true,
    },
    observacao: {
        type: String,
        maxlength: 500,
    },
    listaprodutos: [{
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto',
        },
        quantidade: {
            type: Number,
            required: true,
            default: 1,
        },
    }],
    cancelado: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = mongoose.model('Pedido', schema);
