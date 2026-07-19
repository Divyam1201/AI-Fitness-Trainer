import mongoose from 'mongoose'
import { ENV } from '../lib/env.js'

export const connectDB = async()=>{

    try {
            const connect = await mongoose.connect(ENV.DB_CONN_STG)
            console.log("connected to db successfully")
    } catch (error) {
        console.log("error connecting to db",error)
        process.exit(1)
    }

}