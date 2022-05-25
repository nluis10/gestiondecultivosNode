const mongoose = require('../db/database')

const Schema = mongoose.Schema

const SemillaSchema = new Schema({
    nombre: String,
    costoAgua: String,
    costoSemilla: String,
    costoFertilizante: String
})

const Semilla = mongoose.model('semillas', SemillaSchema)

module.exports = Semilla
