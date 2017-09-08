'use strict';

const mongoose = require('mongoose');
const cliente = mongoose.model('Cliente');
const repository = require('../repositories/cliente-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.post = async(req, res, next) => {
    let validator = new ValidationContract();
    validator.isEmail(req.body.email, 'Email inválido');
    validator.isRequired(req.body.nome, 'O nome é obrigatório');
    validator.isRequired(req.body.endereco, 'O endereço é obrigatório');
    validator.isRequired(req.body.telprincipal,
        'O telefone principal é obrigatório');
    validator.isTel(req.body.telprincipal,
    'Telefone principal inválido');
    validator.isTel(req.body.telsecundario,
        'Telefone secundário inválido');
    validator.isCEP(req.body.CEP,
            'CEP inválido');

    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    };
    
    try {
        await repository.post(req.body)
        res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao salvar cliente"
            , error
        });
    }
};
