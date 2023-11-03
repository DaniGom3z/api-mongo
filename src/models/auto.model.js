const mongoose = require('mongoose');


const autoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  motor: {
    type: String,
    required: true,
  },
  cilindrada: {
    type: String,
    required: true,
  },
  potencia: {
    type: String,
    required: true,
  },
  torque: {
    type: Number,
  },
  cilindros: {
    type: Number,
  },
  valvulas: {
    type: Number,
  },
  alimentacion: {
    type: String,
    required: true,
  },
  traccion: {
    type: String,
    required: true,
  },
  transmicion: {
    type: String,
    required: true,
  },
  velocidadMaxima: {
    type: String,
    maxlength: 25,
  },
  velocidades: {
    type: Number,
  },
  tipo: {
    type: String,
    required: true,
  },
  puertas: {
    type: Number,
  },
  largo: {
    type: Number,
  },
  alto: {
    type: Number,
  },
  peso: {
    type: Number,
  },
  capacidadDelTanque: {
    type: Number,
  },
  consumo: {
    type: Number,
  },
  imagen: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
  },
  deletedAt: {
    type: Date,
  },
  deletedBy: {
    type: String,
  },
});


const Auto = mongoose.model('autos', autoSchema);

module.exports = Auto;
