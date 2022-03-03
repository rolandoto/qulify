const express = require('express')
const cors = require('cors')
const AuthRouter = require('./Routes/Routes')
const { dbConnection } = require('./database/database')
require('dotenv').config()
const app =express()

let port = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.use('/api/auth',AuthRouter.router)

dbConnection()

app.listen(port,() =>{
    console.log('server connect prot 4000')
})