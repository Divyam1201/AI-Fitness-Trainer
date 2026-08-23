import { ENV } from "../lib/env.js";
import {Webhook} from 'svix'
import {AppError, catchError} from '../utils/AppErrorHandler.js'
import { processClerkWebhook } from "../services/webhookServices.js";

export const handleClerkWebhook = catchError(async function(req,res){
    const svixHeaders = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };

    let event;
    const wh = new Webhook(ENV.CLERK_WEBHOOK_SECRET);

    try {
        event = wh.verify(req.body, svixHeaders);
        const processWebhookStatus = await processClerkWebhook(req.headers['svix-id'],event)
        res.status(200).send('ok');
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
       throw new AppError('Invalid signature',400)
    }

  })