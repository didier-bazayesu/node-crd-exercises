import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import dataRoutes  from './routes/dataRoutes.js'
const app = express()
app.use(express.json())
app.use('/data', dataRoutes)

app.listen(process.env.PORT || 6000, ()=>{
    console.log(`The app is running on the port ${process.env.PORT}` )
})