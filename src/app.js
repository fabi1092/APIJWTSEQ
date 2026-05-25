const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const clientesRouter = require('./routes/clientes'); 
const arriendosRouter = require('./routes/arriendos');

const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- AQUÍ VAN TUS RUTAS (Antes de los errores) ---
app.use(routes); // Estas son las rutas base del profe
app.use('/clientes', clientesRouter); 
app.use('/arriendos', arriendosRouter); 
// -------------------------------------------------

// --- MANEJO DE ERRORES (Siempre va al puro final) ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

app.use(errorHandler);

module.exports = app;
