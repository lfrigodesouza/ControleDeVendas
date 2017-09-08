'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.post = async(data)=> {
    var cliente = new Cliente(data);
    await cliente.save();
};

exports.BuscaClientePorTel = async(telprincipal)=>{
    const res = await Cliente.findOne({
        telprincipal: telprincipal,
    });
    return res;
};