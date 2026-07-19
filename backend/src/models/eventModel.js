import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    eventID:{
        type:String,
        unique:true,
        required:true
    },
    eventType:{
        type:String,
        required:true
    },
    eventStatus:{
        type:String
    }
},{
    timestamps:true
})

export const eventModel = mongoose.model('processedEvent',eventSchema)