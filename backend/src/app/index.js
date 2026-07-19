import express from 'express'
import path from 'path'
import {ENV} from '../lib/env.js'
import { fileURLToPath } from "url";
import { clerkMiddleware } from '@clerk/express'
import { webhookRouter } from '../routes/webhookRouter.js';
import { connectDB } from '../db/index.js';

// dynamic path for finding files in production 
const __dirname = path.resolve()

// app instance created 
const app = express()


// establish connecting with db 
connectDB()



// webhook handling 
app.use(clerkMiddleware())
app.use('/api/webhook',webhookRouter)


// app routes 
app.use(express.json())
app.use('/books',(req,res)=>{
    res.json({
        message:"this is the route for books"
    })
})


// route to check service health 
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