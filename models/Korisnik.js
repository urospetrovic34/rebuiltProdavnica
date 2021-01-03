const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KorisnikSchema = new Schema({
    ime:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    datumRegistracije:{
        type:Date,
        default:Date.now
    }
})

module.exports = Korisnik = mongoose.model('korisnik',KorisnikSchema)