'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Produto');
const repository = require('../repositories/produto-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.post = async(req, res, next) => {
    let validator = new ValidationContract();
    validator.isRequired(req.body.codigo, 'O código é obrigatório');
    validator.isNumber(req.body.codigo, 'O código deve ser um número');
    validator.isRequired(req.body.nome, 'O nome é obrigatório');
    validator.isRequired(req.body.valor, 'O valor é obrigatório');
    validator.isMoney(req.body.valor, 'Campo valor inválido');
    validator.isRequired(req.body.classificacao, 'A classificação é obrigatória');
    
        
    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    };
    
    try {
        await repository.post(req.body)
        res.status(201).send({ message: 'Produto cadastrado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao salvar produto"
            , error
        });
    }
};

