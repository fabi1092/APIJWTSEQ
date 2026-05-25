const db = require('../models');
const Arriendo = db.Arriendo;

exports.crearArriendo = async (req, res) => {
  try {
    const { fechaInicio, precioDia, clienteId, autoId } = req.body;

    // Regla de negocio: Validar que el auto no tenga un arriendo activo
    const autoOcupado = await Arriendo.findOne({
      where: { autoId: autoId, estado: 'activo' }
    });

    if (autoOcupado) {
      return res.status(409).json({ error: 'El auto ya tiene un arriendo activo actualmente.' });
    }

    const nuevoArriendo = await Arriendo.create({
      fechaInicio,
      precioDia,
      clienteId,
      autoId
    });

    res.status(201).json(nuevoArriendo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.devolverAuto = async (req, res) => {
  try {
    const { id } = req.params;
    const { fechaFin } = req.body; 

    const arriendo = await Arriendo.findByPk(id);
    if (!arriendo) return res.status(404).json({ error: 'Arriendo no encontrado' });
    if (arriendo.estado === 'finalizado') return res.status(400).json({ error: 'Este arriendo ya está finalizado' });

    // Regla de negocio: Definir fechaFin (enviada por body o la fecha actual)
    const fechaDevolucion = fechaFin ? new Date(fechaFin) : new Date();

    // Regla de negocio: fechaInicio no puede ser posterior a fechaFin
    if (new Date(arriendo.fechaInicio) > fechaDevolucion) {
      return res.status(400).json({ error: 'La fecha de fin no puede ser anterior a la de inicio.' });
    }

    arriendo.fechaFin = fechaDevolucion;
    arriendo.estado = 'finalizado';
    await arriendo.save();

    res.json({ message: 'Auto devuelto exitosamente', arriendo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};