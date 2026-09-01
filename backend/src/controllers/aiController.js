import { getAuth } from "@clerk/express"
import { catchError } from "../utils/AppErrorHandler.js"
import { generateAndStoreNewPlan } from "../utils/generateAndStoreNewPlan.js"

export const handleAINewPlanCreation=catchError(async(req,res)=>{
    const userData = req.body
    // console.log(userData)
    const {userId:clerkUserId} = getAuth(req)
const result = await generateAndStoreNewPlan(userData,clerkUserId)
res.json({message:"success",result})
})