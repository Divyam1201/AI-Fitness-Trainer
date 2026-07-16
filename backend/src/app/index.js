import express from 'express'
import path from 'path'
import {ENV} from '../lib/env.js'
import { fileURLToPath } from "url";


const app = express()

const __dirname = path.resolve()

app.use('/books',(req,res)=>{
    res.json({
        message:"this is the route for books"
    })
})


app.use('/healthCheck',(req,res)=>{
    res.json({
        message:`server is running on ${ENV.PORT}`
    })
})


if (ENV.APP_ENV==="production"){

app.use(express.static(path.join(__dirname,'../frontend/dist')));

app.get("/{*any}",(req,res)=>{  
    res.sendFile(path.join(__dirname,'../frontend','dist', "index.html"));
})
}



export default app