const express = require("express");
const Usuario = require("../models/usuario");
const Predio = require("../models/predio");
const Semilla = require("../models/semilla");
const Cultivo = require("../models/cultivo");

const router = express.Router();

const usuarios = async () => {
  let usuarios = await Usuario.find();

  return usuarios;
};

const buscarUsuario = async (buscar) => {
  let usuarios = await Usuario.find({ $or: [{ nombre: { $regex: buscar } }, { apellido: { $regex: buscar } }, { email: { $regex: buscar } }, { tipoUsuario: { $regex: buscar } }] });

  return usuarios;
};

const predios = async () => {
  let predios = await Predio.find();

  return predios;
};

const buscarPredio = async (buscar) => {
  let predios = await Predio.find({ $or: [{ nombre: { $regex: buscar } }, { usuario: { $regex: buscar } } ] });

  return predios;
};

const semillas = async () => {
  let semillas = await Semilla.find();

  return semillas;
};

const buscarSemilla = async (buscar) => {
  let semillas = await Semilla.find({ $or: [{ nombre: { $regex: buscar } } ] });

  return semillas;
};

const cultivos = async () => {
  let cultivos = await Cultivo.find();

  return cultivos;
};

const buscarCultivo = async (buscar) => {
  let cultivos = await Cultivo.find({ $or: [{ semilla: { $regex: buscar } } ] });

  return cultivos;
};

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
  res.json(await usuarios());
});

router.post("/buscarUsuario", async (req, res) => {
  //console.log(req.body.buscar)
  res.json(await buscarUsuario(req.body.buscar));
});

router.post("/agregarUsuario", async (req, res) => {
  let usuario = new Usuario(req.body);
  await usuario.save();
  res.json({ mensaje: "Usuario agregado" });
});

router.get("/predios", async (req, res) => {
  res.json(await predios());
});

router.post("/buscarPredio", async (req, res) => {
  //console.log(req.body.buscar)
  res.json(await buscarPredio(req.body.buscar));
});

router.post("/agregarPredio", async (req, res) => {
  let predio = new Predio(req.body);
  await predio.save();
  res.json({ mensaje: "Predio agregado" });
});

router.get("/semillas", async (req, res) => {
  res.json(await semillas());
});

router.post("/buscarSemilla", async (req, res) => {
  //console.log(req.body.buscar)
  res.json(await buscarSemilla(req.body.buscar));
});

router.post("/agregarSemilla", async (req, res) => {
  let semilla = new Semilla(req.body);
  await semilla.save();
  res.json({ mensaje: "Semilla agregado" });
});

router.get("/cultivos", async (req, res) => {
  res.json(await cultivos());
});

router.post("/buscarCultivo", async (req, res) => {
  //console.log(req.body.buscar)
  res.json(await buscarCultivo(req.body.buscar));
});

router.post("/agregarCultivo", async (req, res) => {
  let cultivo = new Cultivo(req.body);
  await cultivo.save();
  res.json({ mensaje: "Cultivo agregado" });
});

router.get("/perfil", (req, res) => {
  res.json(perfilDB);
});

router.delete("/eliminar_semilla/:value", async (req, res) => {
  let semilla = Semilla.findById(req.params.value)
  await semilla.deleteOne().catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));

  res.json({mensaje: "Semilla eliminada correctamente."});
});

module.exports = router;
