'use strict';

const mongoose = require('mongoose');
const cliente = mongoose.model('Cliente');
const repository = require('../repositories/cliente-repository');
const ValidationContract = require('../validators/fluent-validator');
const emailService= require('../services/email-service');
// const md5 = require('md5');

const validationCliente = function (req) {
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
        return validator;
}

exports.post = async(req, res, next) => {
    let validator = await validationCliente(req);

    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    };
    
    try {
        await repository.post(req.body)
        //emailService.send('frigo00@gmail.com', 'Bem-vindo'
        //    , global.EMAIL_TMPL.replace('{0}', 'Olá Lucas'));
        res.status(201).send({ message: 'Cliente cadastrado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao salvar cliente"
            , error
        });
    }
};

exports.put = async(req, res, next) => {
    let validator = await validationCliente({body: req.body.cliente});
    
        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        };

        try {
            var data = await repository.put(req.body.id, req.body.cliente);
            res.status(201).send({ message: 'Cliente atualizado com sucesso' });
        } catch (error) {
            res.status(500).send({
                message: "Falha ao atualizar cliente"
                , error
            });
        }
};

exports.BuscaClientePorTel = async(req, res, next) =>{
    try {
        var data = await repository.BuscaClientePorTel(req.params.telprincipal);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.buscaClientes = async(req, res, next) =>{
    try {
        var data = await repository.buscaClientes(req.params.pPage);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.buscaClienteById = async(req, res, next) =>{
    try {
        var data = await repository.buscaClienteById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.QtdTotalClientes = async(req, res, next) =>{
    try {
        var data = await repository.QtdTotalClientes();
        res.status(200).send(data.toString());
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

// Criptografa a senha:
// Concatena a senha criptografada mais a chave gerada
// md5(req.body.password + global.SALT_KEY);
