import { getAuth } from "@clerk/express"
import { AppError, catchError } from "../utils/AppErrorHandler.js"
import { userModel } from "../models/userModel.js"

export const handleGetUser=catchError(async(req,res)=>{
    try {
         const {userId:clerkUserId} = getAuth(req)
    const result = await userModel.find({clerkUserId}).select({_id:0})
    res.json({message:"Success",
        result
    })
    } catch (error) {
        throw new AppError(error,"500")
    }
   
})

export const handleUpdateUser=catchError(async(req,res)=>{
         const {userId:clerkUserId} = getAuth(req)
        const {userData} = req.body
        console.log("exs")
const result = await userModel.findOneAndUpdate({clerkUserId},{$set:{
    userData
}},{returnDocument:"after"}).select({_id:0})
    res.json({message:"Success",
        result
    })

})