const Auto = require('../models/auto.model');
const Cita = require('../models/cita.model');

const obtenerAutos = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const perPage = parseInt(req.query.perPage) || 10;
  
      const autos = await Auto.find({}, ['nombre', 'precio'])
        .limit(perPage)
        .skip((page - 1) * perPage);
  
      res.json(autos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const obtenerAutosPorTipo = async (req, res) => {
    try {
      const tipo = req.params.tipo;
  
      const page = req.query.page || 1;
      const perPage = parseInt(req.query.perPage) || 10;
  
      const autos = await Auto.find({ tipo })
        .select('nombre precio')
        .limit(perPage)
        .skip((page - 1) * perPage);
  
      if (autos.length > 0) {
        res.json(autos);
      } else {
        res.status(404).json({ error: "No se encontraron autos de ese tipo" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const obtenerAuto = async (req, res) => {
    const { nombre } = req.params;
  
    try {
      const auto = await Auto.findOne({ nombre });
  
      if (auto) {
        res.json(auto);
      } else {
        res.status(404).json({ message: 'Auto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const ingresarAuto = async (req, res) => {
    try {
      const nuevoAuto = req.body;
      nuevoAuto.createdBy = req.nombre; 
      const autoGuardado = await Auto.create(nuevoAuto);
  
      res.json(autoGuardado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  
  
const actualizarAuto = async (req, res) => {
    const { nombre } = req.params;
    try {
      const updatedAuto = await Auto.findOneAndUpdate({ nombre }, req.body, { new: true });
      
      if (updatedAuto) {
        updatedAuto.updatedBy = req.nombre; 
        await updatedAuto.save();
        res.json({ mensaje: 'Auto actualizado exitosamente' });
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  
const eliminarLogico = async (req, res) => {
    const { nombre } = req.params;
    try {
      const autoEliminado = await Auto.findOneAndUpdate(
        { nombre },
        {
          deleted_at: new Date(),
          deletedBy: req.nombre, 
        }
      );
  
      if (autoEliminado) {
        res.json({ mensaje: 'Auto eliminado lógicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const eliminarAuto = async (req, res) => {
    const { nombre } = req.params;
    try {
        const autoEliminado = await Auto.findOneAndDelete({ nombre });

        if (autoEliminado) {
            res.json({ mensaje: 'Auto eliminado físicamente exitosamente' });
        } else {
            res.status(404).json({ error: 'Auto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const obtenerCitas = async (req, res) => {
    try {
        const citas = await Cita.find({}, 'nombre correo dia'); 

        res.json(citas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const eliminarCitaLogicamente = async (req, res) => {
    const { correo } = req.params;
    try {
      const citaEliminada = await Cita.findOneAndUpdate(
        { correo },
        {
          deletedAt: new Date(),
          deletedBy: req.nombre, 
        }
      );
  
      if (citaEliminada) {
        res.json({ mensaje: 'Cita eliminada lógicamente exitosamente' });
      } else {
        res.status(404).json({ error: 'Cita no encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  
const eliminarCita = async (req, res) => {
    const { correo } = req.params;

    try {
        const citaEliminada = await Cita.findOneAndDelete({ correo });

        if (citaEliminada) {
            res.json({ mensaje: 'Cita eliminada físicamente exitosamente' });
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const recuperarAuto = async (req, res) => {
    const { nombre } = req.params;
  
    try {
      const autoRecuperado = await Auto.findOneAndUpdate(
        { nombre: nombre, deleted_at: { $ne: null } }, 
        { $set: { deleted_at: null, deletedBy: req.nombre } }, 
      );
  
      if (autoRecuperado) {
        res.json({ mensaje: 'Auto recuperado exitosamente' });
      } else {
        res.status(404).json({ error: 'Auto no encontrado o no eliminado previamente' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  

module.exports = {
  obtenerAutos,
  obtenerAuto,
  ingresarAuto,
  actualizarAuto,
  eliminarAuto,
  obtenerCitas,
  eliminarCita,
  recuperarAuto,
  eliminarLogico,
  eliminarCitaLogicamente,
  obtenerAutosPorTipo
};