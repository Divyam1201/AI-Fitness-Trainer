import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    emailID :{
        type:String,
        required:[true,'Email is required to create an account'],
        unique:[true,'Email already registered'],
        match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"],
    },
    imageURL:{
        type:String
    },
    userClerkID:{
        type:String
    },
},{
    timestamps:true
})

export const userModel = mongoose.model('user',userSchema)