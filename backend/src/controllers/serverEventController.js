import { catchError } from "../utils/AppErrorHandler.js";

const handleServerEvent = catchError(async(req,res)=>{
    const {clerkUserId} = req.params

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