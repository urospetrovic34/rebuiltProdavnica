const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AutomobilSchema = new Schema({
    marka:{
        type:String
    },
    model:{
        type:String
    },
    godiste:{
        type:Number
    },
    kilometraza:{
        type:Number
    },
    karoserija:{
        type:String
    },
    gorivo:{
        type:String
    },
    kubikaza:{
        type:Number
    },
    snagaMotora:{
        type:Number
    },
    cena:{
        type:Number
    },
    slika:{
        type:String
    }
})

module.exports = Automobil = mongoose.model('automobil',AutomobilSchema)