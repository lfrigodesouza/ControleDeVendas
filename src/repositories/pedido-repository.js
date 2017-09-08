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
    });
    return res;
};
