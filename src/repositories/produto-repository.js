'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.post = async(data)=> {
    var produto = new Produto(data);
    await produto.save();
};

exports.BuscaProdutoPorCodigo = async(codigoproduto)=>{
    const res = await Produto.findOne({
        codigo: codigoproduto,
    });
    return res;
};

exports.BuscaProdutoAtivoPorCodigo = async(codigoproduto)=>{
    const res = await Produto.findOne({
        codigo: codigoproduto,
        ativo: true,
    });
    return res;
};

exports.buscaProdutos = async() =>{
    const res = await Produto.find();
    return res;
}

exports.buscaProdutoById = async(id)=>{
    const res = await Produto.findById(id);
    return res;
};

exports.put = async(id, data)=> {
    const res = await Produto.findByIdAndUpdate(id, data);
    return res;
};