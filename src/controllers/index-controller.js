'use strict';

exports.get = (req, res, next) => {
    res.status(200).send({
        title: 'Controle de Vendas API',
        version: '0.0.1',
    });
};
