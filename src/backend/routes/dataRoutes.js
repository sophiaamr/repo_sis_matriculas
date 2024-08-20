const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Rota para obter os dados
router.get('/dados', dataController.getData);

module.exports = router;