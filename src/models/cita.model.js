const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  dia: {
    type: Date,
    required: true,
  },
  deletedAt: {
    type: Date,
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Login',
  },
});

citaSchema.set('timestamps', true);

const Cita = mongoose.model('citas', citaSchema);

module.exports = Cita;
