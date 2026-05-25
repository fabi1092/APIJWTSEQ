const db = require('../models');
const Cliente = db.Cliente;
const Arriendo = db.Arriendo;

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAndCountAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    // Regla de negocio: No eliminar cliente con arriendos activos
    const arriendosActivos = await Arriendo.count({
      where: { clienteId: id, estado: 'activo' }
    });

    if (arriendosActivos > 0) {
      return res.status(409).json({ error: 'No se puede eliminar: el cliente tiene arriendos activos.' });
    }

    await cliente.destroy();
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};