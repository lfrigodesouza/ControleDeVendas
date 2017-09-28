'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true,
    },
    endereco: {
        type: String,
        required: [true, 'O endereço é obrigatório'],
        trim: true,
    },
    complemento: {
        type: String,
        required: false,
        trim: true,
    },
    bairro: {
        type: String,
        required: false,
        trim: true,
    },
    cep: {
        type: String,
        required: false,
        trim: true,
        maxlength: 8,
    },
    cidade: {
        type: String,
        required: false,
        trim: true,
    },
    estado: {
        type: String,
        required: false,
        trim: true,
        maxlength: 2,
    },
    telprincipal: {
        type: String,
        required: [true, 'O telefone principal é obrigatório'],
        trim: true,
        unique: true,
        index: true,
    },
    telsecundario: {
        type: String,
        required: false,
        trim: true,
        index: true,
    },
    empresa: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    conta: {
        type: Boolean,
        required: false,
        default: false,
    },
    observacao: {
        type: String,
        required: false,
        trim: true,
        maxlength: [500, 'A observação deve ter no máximo 500 caracteres'],
    },
});

module.exports = mongoose.model('Cliente', schema);
