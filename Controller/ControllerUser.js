const {response} = require('express')
const MessagingResponse = require('twilio').twiml.MessagingResponse
const twilio = require('twilio')
const usuario = require('../Model/Usuario')
const bcryptjs = require('bcryptjs')
const {GeneratJTW} = require('../helpers/Jwt')

const LoginUsuario =async(req,res=response) =>{

    const {numbers,passwordone} = req.body
    
    try {
        
        const isLogin  = await usuario.findOne({numbers})
        
        if(!isLogin){
            return res.status(401).json({
                ok:false,
                msg:"el usuario no esta registrado"
            })
        }
        
        const validPassword = bcryptjs.compareSync(passwordone,isLogin.passwordone)
        
        if(!validPassword){
            return res.status(401).json({
                ok:false,
                msg:"password incorrecto"
            })
        }

        const token = await GeneratJTW(isLogin.id,isLogin.email)

        return res.status(201).json({
            ok:true,
            token:token
        })

    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }

}

const createRegister =async(req,res=response) =>{
    
    const accountiD = process.env.ACCOUNT_SID
    const authToken = process.env.AUTH_TOKEN
    const client = new twilio(accountiD,authToken)

    const {email,numbers,passwordone,passwordtwo} = req.body
    
    try {
    
    const Email = await usuario.findOne({email})

    if(Email){
       return res.status(401).json({
            ok:false,
            msg:"elija otro correo este ya esta disponible"
        })
    }

    let register =   usuario(req.body)
    
    let salt = bcryptjs.genSaltSync()
    register.passwordone = bcryptjs.hashSync(passwordone,salt)
    register.passwordtwo = bcryptjs.hashSync(passwordtwo,salt)
    
    const token  = await GeneratJTW(register.id,register.email)
    const result  =await register.save()
    
    client.messages.create({
            to:`+57${numbers}`,
            from:'+19107824959',
            body:"codigo 1234 "
        }).then(messages => console.log(messages.sid))
        
        res.status(201).json({
            ok:true,
            result:result,
            token:token
        })
    
    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }
}


const uploadImage = async(req,res=response) =>{
    
    const {email} = req.body
    
    try {

        let product = new usuario({email})
        const {filename} = req.file
        //rolando
            if(req.file){
                product.setImgUrl(filename)
            }
           
        //usuario.setImgUrl(filename)
        
        const to = await  product.save()

        return  res.status(201).json({
             ok:true,
             results:to
        })
    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }

    

}

module.exports ={LoginUsuario,createRegister,uploadImage}
