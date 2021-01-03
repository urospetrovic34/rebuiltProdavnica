const mongoose = require('mongoose')

const db = config.get('mongoURI')

const connectDB = async() => {
    try{
        const connection = await mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
        console.log(`MONGO BAZA JE USPOSTAVLJENA - ${connection.connection.host}`)
    }
    catch(error){
        console.error(err)
    }
}

module.exports = connectDB