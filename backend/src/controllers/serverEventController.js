import { getAuth } from "@clerk/express";
import { catchError } from "../utils/AppErrorHandler.js";
import {addClient, removeClient} from "../services/serverEvent.js"

const handleServerEvent = catchError(async(req,res)=>{
    const {id:clerkUserId} = getAuth()

    res.set({
        "Content-Type":"text/event-stream",
        "Cache-Control":"no-cache",
        Connection :"keep-alive"
    })
    res.flushHeaders()

    addClient(res,clerkUserId)

    req.on("close",()=>{removeClient(clerkUserId)})

})

export {handleServerEvent}