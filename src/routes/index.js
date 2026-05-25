const express = require('express');
const config = require('../config');
const authRoutes = require('./authRoutes');
const marcaRoutes = require('./marcaRoutes');
const autoRoutes = require('./autoRoutes');

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

module.exports = router;
