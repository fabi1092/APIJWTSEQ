const express = require('express');
const config = require('../config');
const authRoutes = require('./authRoutes');
const marcaRoutes = require('./marcaRoutes');
const autoRoutes = require('./autoRoutes');


const clientesRoutes = require('./clientes'); 
const arriendosRoutes = require('./arriendos');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: `Bienvenido a ${config.app.name}`,
    version: config.app.version,
    docs: '/docs (ver carpeta docs/ en el repositorio)',
  });
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/marcas', marcaRoutes);
router.use('/autos', autoRoutes);

// 2. Conectamos tus nuevas rutas al router principal
router.use('/clientes', clientesRoutes);
router.use('/arriendos', arriendosRoutes);

module.exports = router;
