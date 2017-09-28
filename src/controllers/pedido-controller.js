'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Pedido');
const repository = require('../repositories/pedido-repository');
const ValidationContract = require('../validators/fluent-validator');
const { ObjectId } = require('mongodb');
const validationPedido = (req) => {
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

exports.post = async (req, res, next) => {
    let validator = await validationPedido(req);
    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    };
    try {
        const pedido = await repository.post(req.body);
        pedido.code = pedido._id.generationTime.toString();
        repository.salvaCodePedido(new ObjectId(pedido._id), pedido.code);
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso',
            Codigo: pedido.code,
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao salvar pedido"
            , error: error
        });
    }
};

exports.atualizaPedido = async (req, res, next) => {
    let validator = await validadePedido(req);
    try {
        await repository.atualizaPedido(req.body.id, req.body.data)
        res.status(200).send({ message: 'Pedido atualizado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao atualizar pedido"
            , error: error
        });
    }
};

exports.buscaPedidosPendentes = async (req, res, next) => {
    try {
        var data = await repository.buscaPedidosPendentes();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error: error
        });
    }
};

exports.cancelarPedido = async (req, res, next) => {
    try {
        var data = await repository.cancelarPedido(req.body.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error: error
        });
    }
};


exports.entregarPedido = async (req, res, next) => {
    try {
        var data = await repository.entregarPedido(req.body.id);
        if (data.metodopagamento != 'Conta') {
            await repository.pagarPedido(data.id);
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error: error
        });
    }
};

exports.buscaPedidosPorCliente = async (req, res, next) => {
    try {
        var data = await repository.buscaPedidosPorCliente(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            error: error,
        });
    }
}

exports.buscaPedidos = async (req, res, next) => {
    try {
        var data = await repository.buscaPedidos(req.params.pPage);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            error: error,
        });
    }
};

exports.qtdTotalPedidos = async (req, res, next) => {
    try {
        var data = await repository.qtdTotalPedidos();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            error: error,
        });
    }
};

exports.buscaPedidoById = async (req, res, next) => {
    try {
        var data = await repository.buscaPedidoById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            error: error,
        });
    }
}

exports.put = async (req, res, next) => {
    let validator = await validationPedido(req);
    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    };

    try {
        var data = await repository.put(req.body)
        res.status(201).send({ message: 'Pedido atualizado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao atualizar pedido",
            error: error
        })

    }
};
