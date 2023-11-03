const mongoose = require("mongoose");


const loginSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

const Login = mongoose.model("login", loginSchema);

module.exports = Login;
