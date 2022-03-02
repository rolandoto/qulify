const {Schema,model} = require('mongoose')

const ususuariSchema = Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },
     numbers:{
          type:String,
          required:true
         },
     passwordone:{
          type:String,
          required:true
         },
    passwordtwo:{
          type:String,
          required:true
         }
})

module.exports= model('Usuario',ususuariSchema)


