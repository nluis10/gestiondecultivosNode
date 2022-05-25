const mongoose = require('../db/database')

const Schema = mongoose.Schema

const CultivoSchema = new Schema({
    semilla: String,
    area: String,
    cantidadSemillas: String,
    tiempoCultivo: String,
    agua: String,
    cantidadFertilizante: String,
    tiempoRecoleccion: String,
    kgRecolectados: String,
    totalKgSemilla: String,
    totalMetrosAgua: String,
    totalKgFertilizante: String,
    totalKgRecolectados: String,
    costoTotalSemilla: String,
    costoTotalAgua: String,
    costoTotalFertilizante: String,
    tiempoTotalRecoleccion: String,
})

const Cultivo = mongoose.model('cultivos', CultivoSchema)

module.exports = Cultivo
