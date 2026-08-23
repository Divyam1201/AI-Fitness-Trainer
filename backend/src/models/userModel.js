import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    clerkUserId:{
        type:String,
        required:true,
        unique:true
    },
},{
    timestamps:true
})

export const userModel = mongoose.model('user',userSchema)