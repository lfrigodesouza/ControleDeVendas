'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');
const path = require('path');

router.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/produto.html'));
});
router.post('/', controller.post);


module.exports = router;
