const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const Korisnik = require('../../models/Korisnik')

// Razlog sto je odvojeno od korisnici.js je to sto je ruta za registraciju i login ista: post i '/'

router.post('/',(req,res)=>{

    const {email,password} = req.body

    if(!email || !password)
    {
        return res.status(400).json({msg:'Unesite sve trazena polja'})
    }

    Korisnik.findOne({email}).then(korisnik => {

        if(!korisnik)
        {
            return res.status(400).json({msg:"Korisnik sa datim email-om ne postoji"})
        }

        bcrypt.compare(password,korisnik.password).then(pogodak => {

            if(!pogodak)
            {
                return res.status(400).json({msg:"Pogresna sifra"})
            }

            jwt.sign(
                {id:korisnik.id},
                config.get('jwtSecret'),
                {expiresIn:3600},
                (error,token)=>{

                    if(error)
                    {
                        throw error
                    }

                    res.json({
                        token,
                        korisnik:{
                            id:korisnik.id,
                            ime:korisnik.ime,
                            email:korisnik.email
                        }
                    })

                }

            )

        })

    })
})

router.get('/korisnik',auth,(req,res)=>{
    Korisnik.findById(req.korisnik.id).select('-password').then(korisnik => res.json(korisnik))
})

module.exports = router