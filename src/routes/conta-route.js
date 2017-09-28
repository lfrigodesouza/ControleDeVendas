'use strict';

const express = require('express');
const router = express.Router();
// const controller = require('../controllers/conta-controller');
const path = require('path');

router.get('/', (req, res, next) =>{
    res.sendFile(path.join(__dirname+'/../views/conta.html'));
});

module.exports = router;
