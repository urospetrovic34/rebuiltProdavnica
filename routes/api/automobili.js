const express = require('express')
const router = express.Router()

const Car = require('../../models/Car')

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
        const cars = await Car.find(upit).sort([[sortBy,orderBy]])
        res.json(cars)
    } catch (error) {
        console.error(error.message)
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const car = await Car.findById(req.params.id)
        res.json(car)
    } catch (error) {
        console.error(error.message)
    }
})


router.post('/',(req,res)=>{
    const newCar = new Car({
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
    newCar.save().then(car => res.json(car))
})

router.delete('/:id',(req,res)=>{
    Car.findById(req.params.id)
    .then(car => car.remove().then(()=>res.json({success:true})))
    .catch(error => res.status(404).json({success:false}))
})

router.put('/:id',async(req,res)=>{
    try {
        const car = await Car.findById(req.params.id).lean()
        
        if(!car)
        {
            return res.status(400).json({msg:"Pogresna sifra"})
        }

        car = await Car.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,
            runValidators: true    
        })
    } 
    catch (error) {
        
    }
})

module.exports = router