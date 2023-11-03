require("dotenv").config();
const express = require("express");
const app = express();
const usuariosRouter = require("./src/routes/usuarios.route");
const administradorRouter = require("./src/routes/administrador.route.js");


const db = require("./src/config/db.config");

app.use(express.json());

app.use("/usuarios", usuariosRouter);
app.use("/administrador", administradorRouter);

app.listen(process.env.PORT, () => {
  console.log(`API escuchando en el puerto ${process.env.PORT}`);
});
  
