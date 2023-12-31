const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require("../models/login.model");

const iniciarSesion = async (req, res) => {
  const {email, contraseña } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Correo electrónico no válido" });
  }

  try {
    const usuario = await Login.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(403).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      {
        esAdministrador: true,
        email: usuario.email,
        nombre: usuario.nombre, 
      },
      process.env.JWT_SECRET
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  iniciarSesion,
};
