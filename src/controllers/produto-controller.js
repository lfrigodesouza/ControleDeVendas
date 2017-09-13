'use strict';

const mongoose = require('mongoose');
const produto = mongoose.model('Produto');
const repository = require('../repositories/produto-repository');
const ValidationContract = require('../validators/fluent-validator');

const validationProduto = function (req) {
    let validator = new ValidationContract();
    validator.isRequired(req.body.codigo, 'O código é obrigatório');
    validator.isNumber(req.body.codigo, 'O código deve ser um número');
    validator.isRequired(req.body.nome, 'O nome é obrigatório');
    validator.isRequired(req.body.valor, 'O valor é obrigatório');
    validator.isMoney(req.body.valor, 'Campo valor inválido');
    validator.isRequired(req.body.classificacao, 'A classificação é obrigatória');
    return validator;
}

exports.post = async(req, res, next) => {
    let validator = await validationProduto(req);

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

exports.put = async(req, res, next) => {
    console.log(req.body);
    let validator = await validationProduto({body: req.body.produto});
    
        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        };

        try {
            var data = await repository.put(req.body.id, req.body.produto);
            res.status(201).send({ message: 'Produto atualizado com sucesso' });
        } catch (error) {
            res.status(500).send({
                message: "Falha ao atualizar produto"
                , error
            });
        }
};

exports.BuscaProdutoPorCodigo = async(req, res, next) =>{
    try {
        var data = await repository.BuscaProdutoPorCodigo(req.params.codigoproduto);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.buscaProdutos = async(req, res, next) => {
    try {
        var data = await repository.buscaProdutos(req.params.pPage);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
}

exports.buscaProdutoById = async(req, res, next) =>{
    try {
        var data = await repository.buscaProdutoById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};

exports.QtdTotalProdutos = async (req, res, next) =>{
    try {
        var data = await repository.QtdTotalProdutos();
        res.status(200).send(data.toString());
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
            , error
        });
    }
};