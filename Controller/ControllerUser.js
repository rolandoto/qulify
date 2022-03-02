const {response} = require('express')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const twilio = require('twilio')
const usuario = require('../Model/Usuario')

const LoginUsuario =async(req,res=response) =>{
    

}

const createRegister =async(req,res=response) =>{
    
    const accountiD = process.env.ACCOUNT_SID
    const authToken = process.env.AUTH_TOKEN
    const client = new twilio(accountiD,authToken)


    const {email} = req.body
    try {
    
    const Email = await usuario.findOne({email})

    if(Email){
       return res.status(401).json({
            ok:false,
            msg:"elija otro correo este ya esta disponible"
        })
    }

    const register = await  usuario(req.body)

    const result  =await register.save()

     client.messages.create({
            to:`+57${req.body.numbers}`,
            from:'+19107824959',
            body:"codigo 1234 "
        }).then(messages => console.log(messages.sid))

        res.status(201).json({
            ok:true,
            result:result
        })
    
    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }
}

module.exports ={LoginUsuario,createRegister}