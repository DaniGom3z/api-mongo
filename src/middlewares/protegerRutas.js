const jwt = require("jsonwebtoken");
const Login = require('../models/login.model');

const protegerRutas = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso no autorizado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Login.findOne({ id_user: decoded.id }); 
    if (!user) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    req.user = user;
    req.nombre = user.nombre;

    next();
  } catch (error) {
    res.status(403).json({ mensaje: "Token inválido" });
  }
};

module.exports = protegerRutas;
