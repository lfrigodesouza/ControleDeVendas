'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const ObjectID = require('mongodb').ObjectID;

exports.post = async(data)=> {
    let pedido = new Pedido(data);
    return await pedido.save();
};

exports.salvaCodePedido = async(pId, pCode)=>{
    await Pedido.findByIdAndUpdate(pId, {
        $set: {
            codigo: pCode,
        },
    });
};

exports.buscaPedidosPendentes = async()=>{
    const res = await Pedido.find({
        entregue: false,
        cancelado: false,
    }).populate('cliente').sort({dataentrega: 1});
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
    const res = await Pedido.findByIdAndUpdate(id, {
        $set: {
            entregue: true,
        },
    });
    return res;
};

exports.pagarPedido = async(id)=> {
    const res = await Pedido.findByIdAndUpdate(id, {
        $set: {
            pago: true,
        },
    });
    return res;
};

exports.buscaPedidoById = async(id)=>{
    const res = await Pedido.findById(id).populate('cliente').populate('listaprodutos.produto');
    return res;
};

exports.atualizaPedido = async(id, data)=> {
    await Pedido.findByIdAndUpdate(id, data);
};

exports.buscaPedidosPorCliente = async(id) =>{
    const res = await Pedido.find({
        cliente: new ObjectID(id),
        //'cliente' : { "$ref" : 'cliente', "$id" : id  }
    }).sort({datapedido: -1});
    return res;
};

exports.buscaPedidos = async (pPage) =>{
    const res = await Pedido.find().sort({'_id': 1}).skip((pPage - 1)*10).limit(10).populate('cliente');
    return res;
};

exports.qtdTotalPedidos = async() =>{
    const res = await Pedido.count();
    return res.toString();
};

exports.put = async(id, data) =>{
    const res = await Pedido.findByIdAndUpdate(id, data)
    return res;
}
