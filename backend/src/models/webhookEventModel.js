import {Schema , model} from "mongoose"

const eventSchema = new Schema({
    eventId : {type:String,required:true,unique:true},
    eventType: {type:String,required:true},
    eventSource :{type:String,required:true}
},{timestamps:true})

export const processedEvent = model("webhookEvent",eventSchema)