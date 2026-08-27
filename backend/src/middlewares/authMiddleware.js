import { getAuth } from "@clerk/express";

   export const authMiddleware=(req,res,next)=>{
 const { isAuthenticated } = getAuth(req);

     if (!isAuthenticated) {
       return res.status(401).json({ error: "Unauthorized" });
     }
     next()
    }