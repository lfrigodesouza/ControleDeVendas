'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.post = async(data)=> {
    var cliente = new Cliente(data);
    await cliente.save();
};

