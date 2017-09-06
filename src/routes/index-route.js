'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-controller');
const path = require('path');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/../views/index.html'));
});
router.get('/info', controller.get);
// Exporta o objeto para ser utilizado no app.js
module.exports = router;
