const express = require("express");
const administradorRoute = express.Router();
const protegerRutas = require('../middlewares/protegerRutas.js');
const { crearUsuario } = require("../controllers/crearUsuario.controller");
const { iniciarSesion} = require("../controllers/login.controller");
const { cerrarSesion } = require("../controllers/cerrarSesion.controller")
const {
  obtenerAutos,
  obtenerAuto,
  ingresarAuto,
  actualizarAuto,
  eliminarAuto,
  eliminarLogico,
  obtenerCitas,
  eliminarCita,
  recuperarAuto,
  eliminarCitaLogicamente
} = require("../controllers/administrador.controller");
const { obtenerAutosPorTipo } = require("../controllers/usuarios.controller");

administradorRoute.post("/registro", crearUsuario);
administradorRoute.post("/iniciar", iniciarSesion);
administradorRoute.get("/autos", protegerRutas, obtenerAutos);
administradorRoute.get("/autos/tipos/:tipo", protegerRutas, obtenerAutosPorTipo);
administradorRoute.get("/autos/:nombre", protegerRutas, obtenerAuto);
administradorRoute.put("/autos/recuperar/:nombre", protegerRutas, recuperarAuto);
administradorRoute.delete("/citas/eliminacionFisica/:correo", protegerRutas, eliminarCita);
administradorRoute.put("/citas/eliminacionLogica/:correo", protegerRutas, eliminarCitaLogicamente);
administradorRoute.get("/citas", protegerRutas, obtenerCitas);
administradorRoute.put("/autos/eliminacionLogica/:nombre", protegerRutas, eliminarLogico);
administradorRoute.delete("/autos/eliminacionFisica/:nombre", protegerRutas, eliminarAuto);
administradorRoute.post("/autos", protegerRutas, ingresarAuto);
administradorRoute.put("/autos/actualizar/:nombre", protegerRutas, actualizarAuto);
administradorRoute.delete("/cerrarSesion", protegerRutas, cerrarSesion);

module.exports = administradorRoute;
