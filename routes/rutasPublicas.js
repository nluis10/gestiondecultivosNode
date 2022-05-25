const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


const rutas = express.Router();

rutas.post("/login", async (req, res) => {
    let usuario = req.body.email;
  
    let usuarioDB = await Usuario.findOne({ email: usuario });
  
    if (!usuarioDB) {
      return res.json({
         mensaje: "El usuario no existe" 
        });
    } else {
      let validarPassword = await bcrypt.compare(req.body.contrasena, usuarioDB.contrasena);
  
      if (!validarPassword) {
        return res.json({
          mensaje: "Contraseña invalida",
        });
      }
    }
  
    token = jwt.sign({
      id: usuarioDB._id,
      usuario: usuarioDB.email
    }, process.env.SECRET_JWT)
  
    return res.json({
      mensaje: "Bienvenido",
      id: usuarioDB._id,
      usuario: usuarioDB.email,
      nombre: usuarioDB.nombre,
      apellido: usuarioDB.apellido,
      telefono: usuarioDB.telefono,
      tipoUsuario: usuarioDB.tipoUsuario,
      token: token
    })
  });

  module.exports = rutas;