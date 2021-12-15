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
    kgRecolectados: String
})

const Cultivo = mongoose.model('cultivos', CultivoSchema)

module.exports = Cultivo
