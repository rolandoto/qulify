const {Schema,model} = require('mongoose')

const UsusuariSchema = Schema({
     email:{
        type:String,
       
     },
     numbers:{
          type:String,
         
         },
     passwordone:{
          type:String,
       
         },
    passwordtwo:{
          type:String,
          
         },
     imgUrl:String
})

UsusuariSchema.methods.setImgUrl= function setImgUrl (filename){
     const host = process.env.HOST
     const port = process.env.PORT
     this.imgUrl = `${host}/public/${filename}`
}

module.exports= model('Usuario',UsusuariSchema)


