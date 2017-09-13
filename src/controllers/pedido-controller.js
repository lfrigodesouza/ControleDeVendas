'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Pedido');
const repository = require('../repositories/pedido-repository');
const ValidationContract = require('../validators/fluent-validator');

const validationPedido = (req) =>{
    let validator = new ValidationContract();
    validator.isRequired(req.body.cliente, 'O cliente é obrigatório');
    validator.isRequired(req.body.metodopagamento
        , 'O método de pagamento é obrigatório');
    validator.isRequired(req.body.datapedido, 'A data do pedido é obrigatória');
    validator.isRequired(req.body.dataentrega
        , 'A data planejada de entrega é obrigatório');
    validator.isRequired(req.body.valortotal, 'O pedido precisa ter algum valor');
    return validator;
};

exports.post = async(req, res, next) =>{
    let validator = await validationPedido(req);
    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    };


    try {
        await repository.post(req.body)
        res.status(201).send({ message: 'Pedido cadastrado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao salvar pedido"
            , error
        });
    }
};

exports.atualizaPedido = async(req, res, next) =>{
    let validator = await validadePedido(req);
    try {
        await repository.atualizaPedido(req.body.id, req.body.data)
        res.status(200).send({ message: 'Pedido atualizado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao atualizar pedido"
            , error
        });
    }
};

exports.buscaPedidosPendentes = async(req, res, next) =>{
    try {
        var data = await repository.buscaPedidosPendentes();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.cancelarPedido = async(req, res, next) =>{
    try {
        var data = await repository.cancelarPedido(req.body.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};


exports.entregarPedido = async(req, res, next) =>{
    try {
        var data = await repository.entregarPedido(req.body.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};