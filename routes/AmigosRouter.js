const AmigosController = require('../controllers/AmigosController')
const express = require('express');
const router = express.Router();

router.get('/', AmigosController.listar);

module.exports = router;