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

exports.buscaClientes = async()=>{
    const res = await Cliente.find();
    return res;
};

exports.buscaClienteById = async(id)=>{
    const res = await Cliente.findById(id);
    return res;
};

exports.put = async(id, data)=> {
    const res = await Cliente.findByIdAndUpdate(id, data);
    return res;
};