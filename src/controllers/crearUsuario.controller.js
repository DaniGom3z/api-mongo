const Joi = require('joi');
const bcrypt = require('bcrypt');
const Login = require('../models/login.model'); // Asegúrate de importar correctamente el modelo de login

const schema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  contraseña: Joi.string().min(6).required(),
});

const crearUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    // Generamos un hash de contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Creamos el registro de usuario
    const newUser = new Login({
      nombre,
      email,
      contraseña: hashedPassword,
    });

    // Guardamos el usuario en la base de datos
    const usuario = await newUser.save();

    res.json({ mensaje: "Usuario creado exitosamente", usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearUsuario,
};
