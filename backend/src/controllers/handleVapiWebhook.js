import { ENV } from "../lib/env.js";
import { AppError } from "../utils/AppErrorHandler.js";

export const handleVapiWebhook = (req,res)=>{

    const messageId = req.headers['x-vapi-message-id'];         
  const timestamp  = req.headers['x-timestamp']; 
  const signatureHeader = req.headers['x-signature']; 
  const rawBody = req.body.toString('utf8');
  
   if (!messageId || !timestamp || !signatureHeader) {
    throw new AppError( 'Missing signature headers',400)
  }

  const event = JSON.parse(rawBody);
  if(event.message.type==="end-of-call-report")
  {
  console.log("event1",event) 
  
  }
  res.status(200).json({ received: true });

}