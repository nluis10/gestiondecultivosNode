const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const Predio = require("../models/predio");
const Semilla = require("../models/semilla");
const Cultivo = require("../models/cultivo");


const rutas = express.Router();

let perfilDB = [
  {
    id: "001",
    nombre: "Sandra Milena",
    apellido: "Gutierrez",
    email: "sgutierrez@uninorte.edu.co",
    telefono: "3009895214",
    tipoUsuario: "Administrador",
  },
];


rutas.get("/usuarios", async (req, res) => {
  let usuarios = await Usuario.find();
  res.json(usuarios);
});

rutas.get("/usuario/:id", async (req, res) => {
  let usuarioId = await Usuario.findById(req.params.id);
  res.json(usuarioId);
});

rutas.get("/usuarioEmail/:email", async (req, res) => {
  let usuarioId = await Usuario.findOne({ email: req.params.email });
  res.json(usuarioId);
});

rutas.post("/buscarUsuario", async (req, res) => {
  let buscar = req.body.buscar;
  let usuarios = await Usuario.find({
    $or: [{ nombre: { $regex: buscar } }, { apellido: { $regex: buscar } }, { email: { $regex: buscar } }, { tipoUsuario: { $regex: buscar } }, { telefono: { $regex: buscar } }],
  });
  res.json(usuarios);
});

rutas.post("/agregarUsuario", async (req, res) => {
  let datos = req.body;

  let salt = await bcrypt.genSalt(12);
  let password = await bcrypt.hash(datos.contrasena, salt);

  datos = {
    ...datos,
    contrasena: password,
  };

  let usuario = await new Usuario(datos);
  await usuario.save();
  res.json({ mensaje: "Usuario agregado" });
});

rutas.put("/editarUsuario/:id", async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);

  usuario.nombre = req.body.nombre;
  usuario.apellido = req.body.apellido;
  usuario.email = req.body.email;
  usuario.telefono = req.body.telefono;
  usuario.tipoUsuario = req.body.tipoUsuario;

  await usuario.save();

  res.json({ mensaje: "Usuario actualizado" });
});

rutas.delete("/eliminarUsuario/:id", async (req, res) => {
  let usuario = await Usuario.findById(req.params.id);

  await usuario.deleteOne();

  res.json({ mensaje: "Usuario eliminado" });
});

rutas.get("/predios", async (req, res) => {
  let predios = await Predio.find();
  res.json(predios);
});

rutas.get("/predio/:id", async (req, res) => {
  let predioId = await Predio.findById(req.params.id);
  res.json(predioId);
});

rutas.post("/buscarPredio", async (req, res) => {
  let buscar = req.body.buscar;
  let predios = await Predio.find({ $or: [{ nombre: { $regex: buscar } }, { usuario: { $regex: buscar } }] });
  res.json(predios);
});

rutas.post("/agregarPredio", async (req, res) => {
  let predio = await new Predio(req.body);
  await predio.save();
  res.json({ mensaje: "Predio agregado" });
});

rutas.put("/editarPredio/:id", async (req, res) => {
  const predio = await Predio.findById(req.params.id);

  predio.nombre = req.body.nombre;
  predio.usuario = req.body.usuario;
  predio.latitud = req.body.latitud;
  predio.longitud = req.body.longitud;

  await predio.save();

  res.json({ mensaje: "Predio actualizado" });
});
// Eliminar predio

rutas.delete("/eliminarPredio/:id", async (req, res) => {
  let predio = await Predio.findById(req.params.id);

  await predio.deleteOne();

  res.json({ mensaje: "Predio eliminado" });
});

rutas.get("/semillas", async (req, res) => {
  let semillas = await Semilla.find();
  res.json(semillas);
});

rutas.get("/semilla/:id", async (req, res) => {
  let semillaId = await Semilla.findById(req.params.id);
  res.json(semillaId);
});

rutas.post("/buscarSemilla", async (req, res) => {
  let buscar = req.body.buscar;
  let semillas = await Semilla.find({ $or: [{ nombre: { $regex: buscar } }] });
  res.json(semillas);
});

rutas.post("/agregarSemilla", async (req, res) => {
  let semilla = await new Semilla(req.body);
  await semilla.save();
  res.json({ mensaje: "Semilla agregada" });
});

rutas.put("/editarSemilla/:id", async (req, res) => {
  const semilla = await Semilla.findById(req.params.id);

  semilla.nombre = req.body.nombre;
  semilla.costoAgua = req.body.costoAgua;
  semilla.costoSemilla = req.body.costoSemilla;
  semilla.costoFertilizante = req.body.costoFertilizante;

  await semilla.save();

  res.json({ mensaje: "Semilla actualizada" });
});

rutas.delete("/eliminarSemilla/:id", async (req, res) => {
  let semilla = await Semilla.findById(req.params.id);

  await semilla.deleteOne();

  res.json({ mensaje: "Semilla eliminada" });
});

rutas.get("/cultivos", async (req, res) => {
  let cultivos = await Cultivo.find();
  res.json(cultivos);
});

rutas.get("/cultivo/:id", async (req, res) => {
  let cultivoId = await Cultivo.findById(req.params.id);
  res.json(cultivoId);
});

rutas.post("/buscarCultivo", async (req, res) => {
  let buscar = req.body.buscar;
  let cultivos = await Cultivo.find({ $or: [{ semilla: { $regex: buscar } }] });
  res.json(cultivos);
});

rutas.post("/agregarCultivo", async (req, res) => {
  let cultivo = await new Cultivo(req.body);
  await cultivo.save();
  res.json({ mensaje: "Cultivo agregado" });
});

rutas.put("/editarCultivo/:id", async (req, res) => {
  const cultivo = await Cultivo.findById(req.params.id);

  cultivo.semilla = req.body.semilla;
  cultivo.area = req.body.area;
  cultivo.cantidadSemillas = req.body.cantidadSemillas;
  cultivo.tiempoCultivo = req.body.tiempoCultivo;
  cultivo.agua = req.body.agua;
  cultivo.cantidadFertilizante = req.body.cantidadFertilizante;
  cultivo.tiempoRecoleccion = req.body.tiempoRecoleccion;
  cultivo.kgRecolectados = req.body.kgRecolectados;

  await cultivo.save();

  res.json({ mensaje: "Cultivo actualizado" });
});
//Eliminar cultivo
rutas.delete("/eliminarCultivo/:id", async (req, res) => {
  let cultivo = await Cultivo.findById(req.params.id);

  await cultivo.deleteOne();

  res.json({ mensaje: "Cultivo eliminado" });
});

rutas.get("/perfil", (req, res) => {
  res.json(perfilDB);
});

module.exports = rutas;
