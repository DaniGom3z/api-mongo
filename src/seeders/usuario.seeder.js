const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Login = require('../models/login.model');



const usuarioPrueba = {
  nombre: 'UsuarioPrueba',
  email: 'usuario@example.com',
  contraseña: 'contraseñaSegura', 
};


const cifrarContraseña = async () => {
  const saltRounds = 10;
  usuarioPrueba.contraseña = await bcrypt.hash(usuarioPrueba.contraseña, saltRounds);
};


const insertarUsuario = async () => {
  try {
    await cifrarContraseña();
    const newUser = new Login(usuarioPrueba);
    await newUser.save();
    console.log('Usuario de prueba insertado exitosamente');
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
  } finally {
    mongoose.connection.close();
  }
};


insertarUsuario();
