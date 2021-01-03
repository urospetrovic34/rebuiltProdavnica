const jwt = require('jsonwebtoken')

function auth(req,res,next){

    const token = req.header('x-auth-header')

    if(!token)
    {
        return res.status(401).json({msg:"Dozvola odbijena"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT)
        req.korisnik = decoded
        next()
    }
    catch(error)
    {
        res.status(400).json({msg:"Podaci nisu validni"})
    }
}

module.exports = auth