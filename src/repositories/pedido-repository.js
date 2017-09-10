'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.post = async(data)=> {
    var pedido = new Pedido(data);
    await pedido.save();
};

exports.buscaPedidosPendentes = async()=>{
    const res = await Pedido.find({
        entregue: false,
        cancelado: false,
    }).populate('cliente');
    return res;
};

exports.cancelarPedido = async(id)=> {
    await Pedido.findByIdAndUpdate(id, {
        $set: {
            cancelado: true,
        },
    });
};

exports.entregarPedido = async(id)=> {
    await Pedido.findByIdAndUpdate(id, {
        $set: {
            entregue: true,
        },
    });
};

exports.buscaPedidoById = async(id)=>{
    const res = await PedfindById(id).populate('cliente');
    return res;
};

exports.atualizaPedido = async(id, data)=> {
    await Pedido.findByIdAndUpdate(id, data);
};
