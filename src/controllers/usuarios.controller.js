const nodemailer = require('nodemailer');
const validator = require("validator");
require("dotenv").config();
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

const agregarCita = async (req, res) => {
    try {
      const { nombre, correo, dia } = req.body;
  
      if (typeof correo !== 'string' || !validator.isEmail(correo)) {
        return res.status(400).json({ error: 'Correo electrónico no válido' });
      }
  
      const citaExistente = await Cita.findOne({ correo });
      if (citaExistente) {
        return res.status(400).json({ error: 'El correo ya está registrado en la tabla de citas' });
      }
  
      const nuevaCita = new Cita({ nombre, correo, dia });
      await nuevaCita.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: correo,
        subject: 'Confirmación de cita',
        text: `Hola ${nombre}\n\nTu cita ha sido confirmada con éxito. Gracias por agendar con nosotros en la fecha: ${dia}.\n\nTe estaremos esperando con mucho gusto.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });
  
      res.json(nuevaCita);
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

module.exports = {
  obtenerAutos,
  obtenerAutosPorTipo,
  agregarCita,
  obtenerAuto
};