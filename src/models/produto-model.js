'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    codigo: {
        type: Number,
        required: [true, 'O código é obrigatório'],
        index: true,
        trim: true,
        unique: true,
    },
    nome: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    valor: {
        type: Number,
        required: true,
        trim: true,
    },
    classificacao: {
        type: String,
        required: true,
        enum: ['Prato Feito', 'Massa', 'Molho', 'Acompanhamento',
            'Sobremesa', 'Adicional', 'Salada', 'Bebida'],
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true,
        index: true,
    },
    observacao: {
        type: String,
        trim: true,
        maxlength: 500,
    },
});

module.exports = mongoose.model('Produto', schema);
