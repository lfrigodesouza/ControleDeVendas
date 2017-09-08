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
        ativo: true,
    });
    return res;
};


