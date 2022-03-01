const {response} = require('express')
const { pool } = require('../database/database')
const MessagingResponse = require('twilio').twiml.MessagingResponse


const LoginUsuario =async(req,res=response) =>{

     
    res.status(201).json({
        ok:true
    })
}

const Peticion =async(req,res=response) =>{

    const accountiD = process.env.ACCOUNT_SID
    const authToken = process.env.AUTH_TOKEN
    const client=  require('twilio')(accountiD,authToken)
        console.log(req)
    try {
    client.messages.create({
        to:`+57${req.body.numbers}`,
        from:'+19107824959',
        body:"hola bb que mas pues soy tu amigo secreto"
    }).then(messages => console.log(messages.sid))


    return res.status(201).json({
        ok:true
        }) 
    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }
    
}

module.exports ={LoginUsuario,Peticion}