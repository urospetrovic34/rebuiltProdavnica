const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const Korisnik = require('../../models/Korisnik')

// U korisnici.js ruti ide samo registracija korisnika

router.post('/',(req,res)=>{

    const {ime,email,password} = req.body

    if(!name || !email || !password)
    {
        return res.status(400).json({msg:"Molim Vas unesite sva polja za uspesnu registraciju"})
    }

    Korisnik.findOne({email}).then(korisnik => {
        if(korisnik)
        {
            return res.status(400).json({msg:"Korisnik sa ovom email adresom vec postoji"})
        }
        
        const noviKorisnik = new Korisnik({
            ime,email,password            
        })

        //stavicemo promise based zbog bcrypt-a
        bcrypt.genSalt(10,(error,salt)=>{
            bcrypt.hash(noviKorisnik,password,salt,(error,hash)=>{
                if(error)
                {
                    throw error
                }
                noviKorisnik.password = hash
                noviKorisnik.save().then(korisnik=>{
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
                                    email:korisnik.email,
                                }
                            })
                        }
                    )
                })
            })
        })
    })
})

module.exports = router