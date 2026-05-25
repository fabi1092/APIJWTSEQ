const express = require('express');
const router = express.Router();
const arriendoController = require('../controllers/arriendoController');

// Cambiamos verificarToken por el nombre real que usó el profe
const { verifyAccessToken } = require('../middlewares/auth'); 

router.use(verifyAccessToken); 

router.post('/', arriendoController.crearArriendo);
router.post('/:id/devolver', arriendoController.devolverAuto);

module.exports = router;