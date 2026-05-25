const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Importa y usa tu middleware de token (Asegúrate de que el nombre verifyToken sea el correcto)
const { verifyAccessToken } = require('../middlewares/auth'); 
router.use(verifyAccessToken); 

router.get('/', clienteController.listarClientes);
router.post('/', clienteController.crearCliente);
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
