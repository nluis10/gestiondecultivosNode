const express = require("express");
const Usuario = require("../models/usuario");
const Predio = require("../models/predio");
const Semilla = require("../models/semilla");
const Cultivo = require("../models/cultivo");

const router = express.Router();

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

router.get("/usuarios", async (req, res) => {
  let usuarios = await Usuario.find();
  res.json(usuarios);
});

router.get("/usuario/:id", async (req, res) => {
  let usuarioId = await Usuario.findById(req.params.id);
  res.json(usuarioId);
});

router.post("/buscarUsuario", async (req, res) => {
  let buscar = req.body.buscar
  let usuarios = await Usuario.find({ $or: [{ nombre: { $regex: buscar } }, { apellido: { $regex: buscar } }, { email: { $regex: buscar } }, { tipoUsuario: { $regex: buscar } }, { telefono: { $regex: buscar } }] });
  res.json(usuarios);
});

router.post("/agregarUsuario", async (req, res) => {
  let usuario = await new Usuario(req.body);
  await usuario.save();
  res.json({ mensaje: "Usuario agregado" });
});

router.put('/editarUsuario/:id', async (req, res) => {
  
  const usuario = await Usuario.findById(req.params.id)

  usuario.nombre = req.body.nombre
  usuario.apellido = req.body.apellido
  usuario.email = req.body.email
  usuario.telefono = req.body.telefono
  usuario.tipoUsuario = req.body.tipoUsuario

  await usuario.save()

  res.json({mensaje: "Usuario actualizado"})
})

router.delete('/eliminarUsuario/:id', async (req, res) => {

  let usuario = await Usuario.findById(req.params.id)

  await usuario.deleteOne()

  res.json({mensaje: "Usuario eliminado"})
})

router.get("/predios", async (req, res) => {
  let predios = await Predio.find();
  res.json(predios);
});

router.get("/predio/:id", async (req, res) => {
  let predioId = await Predio.findById(req.params.id);
  res.json(predioId);
});

router.post("/buscarPredio", async (req, res) => {
  let buscar = req.body.buscar
  let predios = await Predio.find({ $or: [{ nombre: { $regex: buscar } }, { usuario: { $regex: buscar } } ] });
  res.json(predios);
});

router.post("/agregarPredio", async (req, res) => {
  let predio = await new Predio(req.body);
  await predio.save();
  res.json({ mensaje: "Predio agregado" });
});

router.put('/editarPredio/:id', async (req, res) => {
  
  const predio = await Predio.findById(req.params.id)

  predio.nombre = req.body.nombre
  predio.usuario = req.body.usuario
  predio.latitud = req.body.latitud
  predio.longitud = req.body.longitud

  await predio.save()

  res.json({mensaje: "Predio actualizado"})
})

router.get("/semillas", async (req, res) => {
  let semillas = await Semilla.find();
  res.json(semillas);
});

router.get("/semilla/:id", async (req, res) => {
  let semillaId = await Semilla.findById(req.params.id);
  res.json(semillaId);
});

router.post("/buscarSemilla", async (req, res) => {
  let buscar = req.body.buscar
  let semillas = await Semilla.find({ $or: [{ nombre: { $regex: buscar } } ] });
  res.json(semillas);
});

router.post("/agregarSemilla", async (req, res) => {
  let semilla = await new Semilla(req.body);
  await semilla.save();
  res.json({ mensaje: "Semilla agregado" });
});

router.put('/editarSemilla/:id', async (req, res) => {
  
  const semilla = await Semilla.findById(req.params.id)

  semilla.nombre = req.body.nombre
  semilla.costoAgua = req.body.costoAgua
  semilla.costoSemilla = req.body.costoSemilla
  semilla.costoFertilizante = req.body.costoFertilizante

  await semilla.save()

  res.json({mensaje: "Semilla actualizado"})
})

router.delete('/eliminarSemilla/:id', async (req, res) => {

  let semilla = await Semilla.findById(req.params.id)

  await semilla.deleteOne()

  res.json({mensaje: "Semilla eliminado"})
})

router.get("/cultivos", async (req, res) => {
  let cultivos = await Cultivo.find();
  res.json(cultivos);
});

router.get("/cultivo/:id", async (req, res) => {
  let cultivoId = await Cultivo.findById(req.params.id);
  res.json(cultivoId);
});

router.post("/buscarCultivo", async (req, res) => {
  let buscar = req.body.buscar
  let cultivos = await Cultivo.find({ $or: [{ semilla: { $regex: buscar } } ] });
  res.json(cultivos);
});

router.post("/agregarCultivo", async (req, res) => {
  let cultivo = await new Cultivo(req.body);
  await cultivo.save();
  res.json({ mensaje: "Cultivo agregado" });
});

router.put('/editarCultivo/:id', async (req, res) => {
  
  const cultivo = await Cultivo.findById(req.params.id)
  
  cultivo.semilla = req.body.semilla
  cultivo.area = req.body.area
  cultivo.cantidadSemillas = req.body.cantidadSemillas
  cultivo.tiempoCultivo = req.body.tiempoCultivo
  cultivo.agua = req.body.agua
  cultivo.cantidadFertilizante = req.body.cantidadFertilizante
  cultivo.tiempoRecoleccion = req.body.tiempoRecoleccion
  cultivo.kgRecolectados = req.body.kgRecolectados

  await cultivo.save()

  res.json({mensaje: "Cultivo actualizado"})
})

router.get("/perfil", (req, res) => {
  res.json(perfilDB);
});

module.exports = router;
