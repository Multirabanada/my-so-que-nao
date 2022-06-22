var express = require('express');
var router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');
const UploadDeAvatar = require('../middlewares/UploadDeAvatar');

router.post('/', UploadDeAvatar, UsuariosController.registrar);
router.get('/', UsuariosController.buscar);
router.post('/login', UsuariosController.login);

module.exports = router;