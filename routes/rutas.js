const express = require("express");
const Usuario = require("../models/usuario")

const router = express.Router();

const usuarios = async () => {
  let usuarios = await Usuario.find()
  return usuarios
}

let usuariosDB = [
  {
    id: "001",
    nombre: "Nestor",
    apellido: "Barrios",
    email: "nestor@gmail.com",
    telefono: "300-1234567",
    tipoUsuario: "Configuracion",
  },
  {
    id: "002",
    nombre: "Keiny",
    apellido: "Salgado",
    email: "keiny@gmail.com",
    telefono: "300-1234567",
    tipoUsuario: "Gestion",
  },
  {
    id: "003",
    nombre: "Sandra",
    apellido: "Gutierrez",
    email: "sandra@gmail.com",
    telefono: "300-1234567",
    tipoUsuario: "Gestion",
  },
  {
    id: "004",
    nombre: "Sandra",
    apellido: "Salgado",
    email: "@gmail.com",
    telefono: "300-1234567",
    tipoUsuario: "Configuracion",
  },
];

let prediosDB = [
  {
    id: "0001",
    nombre: "Predio 01",
    Latitud: "11,0084",
    Longitud: "-74,8216",
    Usuario: "Nestor",
  },
  {
    id: "0002",
    nombre: "Predio 02",
    Latitud: "11,0153",
    Longitud: "-74,8279",
    Usuario: "Keiny",
  },
  {
    id: "0003",
    nombre: "Predio 03",
    Latitud: "11,0153",
    Longitud: "-74.7867",
    Usuario: "Sandra",
  },
];

let semillasDB = [
  {
    id: "0001",
    descripcion: "Cereales",
    CostoAgua: "200",
    CostoSemilla: "350",
    CostoFertilizante: "250",
  },
  {
    id: "0002",
    descripcion: "Leguminosas",
    CostoAgua: "150",
    CostoSemilla: "180",
    CostoFertilizante: "250",
  },
  {
    id: "0003",
    descripcion: "Hortalizas",
    CostoAgua: "180",
    CostoSemilla: "300",
    CostoFertilizante: "230",
  },
];

let cultivosDB = [
  {
    id: "001",
    tipodecultivos: "arroz",
    area: "lo que sea",
    cantidadsemillas: "11",
    tiempodelcultivo: "14 dias",
    metroscubicosdeagua: "2m3",
    kgfertilizante: "40kg",
    tiempopararecoleccion: "5 dias",
    kgrecolectados: "70",
  },
  {
    id: "002",
    tipodecultivos: "Yuca",
    area: "lo que sea",
    cantidadsemillas: "11",
    tiempodelcultivo: "14 dias",
    metroscubicosdeagua: "2m3",
    kgfertilizante: "40kg",
    tiempopararecoleccion: "5 dias",
    kgrecolectados: "70",
  },
  {
    id: "003",
    tipodecultivos: "Limon",
    area: "lo que sea",
    cantidadsemillas: "11",
    tiempodelcultivo: "14 dias",
    metroscubicosdeagua: "2m3",
    kgfertilizante: "40kg",
    tiempopararecoleccion: "5 dias",
    kgrecolectados: "70",
  },
];

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

router.post("/agregarUsuario", async (req, res) => {

  let usuario = new Usuario(req.body)
  await usuario.save();
  res.json({mensaje: "Usuario agregado"});
});

router.get("/predios", (req, res) => {
  res.json(prediosDB);
});

router.get("/semillas", (req, res) => {
  res.json(semillasDB);
});

router.get("/cultivos", (req, res) => {
  res.json(cultivosDB);
});

router.get("/perfil", (req, res) => {
  res.json(perfilDB);
});

module.exports = router;
