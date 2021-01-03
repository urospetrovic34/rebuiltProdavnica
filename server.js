const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const connectDB = require('./db/db')

connectDB()

const app = express()

app.use(express.json())

const port = process.env.PORT || 8000

app.listen(port,()=>console.log(`SERVER USPOSTAVLJEN NA ADRESI : http://localhost:${port}`))