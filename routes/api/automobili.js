const express = require('express')
const router = express.Router()

const Automobil = require('../../models/Automobil')

router.get('/', async (req,res) => {
    try {
        const upit = {}
        const sortBy = req.query.sortBy
        const orderBy = req.query.orderBy
        const marka = req.query.marka
        const model = req.query.model
        const karoserija = req.query.karoserija
        if(marka !== undefined)
        {
            upit['marka']=marka
        }
        if(model !== undefined)
        {
            upit['model']=model
        }
        if(karoserija !== undefined)
        {
            upit['karoserija']=karoserija
        }
        const automobili = await Automobil.find(upit).sort([[sortBy,orderBy]])
        res.json(automobili)
    } catch (error) {
        console.error(error.message)
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const automobil = await Automobil.findById(req.params.id)
        res.json(automobil)
    } catch (error) {
        console.error(error.message)
    }
})


router.post('/',(req,res)=>{
    const noviAutomobil = new Automobil({
        marka:req.body.marka,
        model:req.body.model,
        godiste:req.body.godiste,
        kilometraza:req.body.kilometraza,
        karoserija:req.body.karoserija,
        gorivo:req.body.gorivo,
        kubikaza:req.body.kubikaza,
        snagaMotora:req.body.snagaMotora,
        cena:req.body.cena,
        slika:req.body.slika
    })
    //.save() tako se insertuju podaci u kolekciju, nije bitno kako ih prepoznaje 
    noviAutomobil.save().then(automobil => res.json(automobil))
})

router.delete('/:id',(req,res)=>{
    Automobil.findById(req.params.id)
    .then(automobil => automobil.remove().then(()=>res.json({success:true})))
    .catch(error => res.status(404).json({success:false}))
})

router.put('/:id',async(req,res)=>{
    try {
        const automobil = await Automobil.findById(req.params.id).lean()
        
        if(!automobil)
        {
            return res.status(400).json({msg:"Pogresna sifra"})
        }

        automobil = await Automobil.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,
            runValidators: true    
        })
    } 
    catch (error) {
        
    }
})

module.exports = router