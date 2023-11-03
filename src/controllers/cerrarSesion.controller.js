const cerrarSesion = (req, res) => {
    res.json({
      mensaje: "Cierre de sesión exitoso",
    });
};
  
module.exports = {
    cerrarSesion,
};