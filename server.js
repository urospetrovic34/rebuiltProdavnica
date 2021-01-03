const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const connectDB = require('./db/db')

connectDB()

const app = express()

app.use(express.json())

app.use('/api/automobili',require('./routes/api/automobili'))
app.use('/api/korisnici',require('./routes/api/korisnici'))
app.use('/api/auth',require('./routes/api/auth'))

const port = process.env.PORT || 8000

app.listen(port,()=>console.log(`SERVER USPOSTAVLJEN NA ADRESI : http://localhost:${port}`))