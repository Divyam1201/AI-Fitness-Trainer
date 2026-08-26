import express from 'express'
import path from 'path'
import {ENV} from '../lib/env.js'
import { fileURLToPath } from "url";
import { clerkMiddleware } from '@clerk/express'
import { webhookRouter } from '../routes/webhookRouter.js';
import { connectDB } from '../db/index.js';
import { errorHandler } from '../middlewares/ErrorMiddleware.js';
import dietRouter from '../routes/dietRouter.js';
import exerciseRouter from '../routes/exerciseRouter.js';
import cors from 'cors';
import eventRouter from '../routes/eventRouter.js';

// dynamic path for finding files in production 
const __dirname = path.resolve()

// app instance created 
const app = express()

const allowedOrigins = [
  'http://localhost:5173', // Vite default local port
  'https://yourproductionfrontend.com' // Production domain
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Authorization is required for the Clerk Bearer token
  credentials: true // Required if you use cookies or sessions
}));
app.use(clerkMiddleware())

// establish connection with db 
connectDB()



// webhook handling 
app.use('/api/webhook',webhookRouter)


// app routes 
app.use(express.json())

app.use('/api/dietPlan',dietRouter)
app.use('/api/exercisePlan',exerciseRouter)
app.use('/api/event',eventRouter)


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

app.use(errorHandler)

export default app