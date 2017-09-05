'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-controller');


router.get('/info', controller.get);

// Exporta o objeto para ser utilizado no app.js
module.exports = router;
