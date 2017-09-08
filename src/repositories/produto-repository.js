'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.post = async(data)=> {
    var produto = new Produto(data);
    await produto.save();
};