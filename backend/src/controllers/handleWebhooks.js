import { ENV } from "../lib/env.js";
import {Webhook} from 'svix'

export const handleClerkWebhook = async function(req,res){
    const CLERK_WEBHOOK_SECRET = ENV.CLERK_WEBHOOK_SECRET
    const svixHeaders = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };

    let event;
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    try {
        event = wh.verify(req.body, svixHeaders);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send('Invalid signature');
    }

     const eventId = svixHeaders['svix-id'];
    const alreadyProcessed = await ProcessedEvent.findOne({ eventId });
    if (alreadyProcessed) {
      return res.status(200).send('Already processed');
    }

 try {
      switch (event.type) {
        case 'user.created':
          await User.create({
            clerkId: event.data.id,
            email: event.data.email_addresses[0]?.email_address||event.data.primary_email_address_id,
          });
          break;

        case 'user.updated':
          await User.findOneAndUpdate(
            { clerkId: event.data.id },
            { email: event.data.email_addresses[0].email_address }
          );
          break;
 case 'user.deleted':
          await User.findOneAndDelete({ clerkId: event.data.id });

          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      } 
      
      res.status(200).send('ok');
    } catch (err) {
      console.error('Error processing webhook:', err.message);
      // Return 500 so Clerk retries later
      res.status(500).send('Processing failed');
    }
  }