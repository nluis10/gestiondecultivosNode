const mongoose = require('../db/database')

const Schema = mongoose.Schema

const PredioSchema = new Schema({
    nombre: String,
    latitud: String,
    longitud: String,
    usuario: String
})

const Predio = mongoose.model('predios', PredioSchema)

module.exports = Predio