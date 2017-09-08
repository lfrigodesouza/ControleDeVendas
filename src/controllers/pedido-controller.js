'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Pedido');
const pedidorepository = require('../repositories/pedido-repository');
const clienterepository = require('../repositories/cliente-repository');
const produtorepository = require('../repositories/produto-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.post = async(req, res, next) =>{
    let validator = new ValidationContract();
    validator.isRequired(req.body.cliente, 'O cliente é obrigatório');
    validator.isRequired(req.body.metodopagamento
        , 'O método de pagamento é obrigatório');
    validator.isRequired(req.body.datapedido, 'A data do pedido é obrigatória');
    validator.isRequired(req.body.dataentrega
        , 'A data planejada de entrega é obrigatório');
    validator.isRequired(req.body.valortotal, 'O pedido precisa ter algum valor');
    
        
    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    };
    
    try {
        await pedidorepository.post(req.body)
        res.status(201).send({ message: 'Pedido cadastrado com sucesso' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao salvar pedido"
            , error
        });
    }
};

exports.BuscaClientePorTel = async(req, res, next) =>{
    try {
        var data = await clienterepository.BuscaClientePorTel(req.params.telprincipal);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.BuscaProdutoPorCodigo = async(req, res, next) =>{
    try {
        var data = await produtorepository.BuscaProdutoPorCodigo(req.params.codigoproduto);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.buscaPedidosPendentes = async(req, res, next) =>{
    try {
        var data = await pedidorepository.buscaPedidosPendentes();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};
