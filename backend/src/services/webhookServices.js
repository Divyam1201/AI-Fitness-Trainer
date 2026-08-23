import { Webhook } from "svix";
import { ENV } from "../lib/env.js";
import { processedEvent } from "../models/webhookEventModel.js";
import { userModel } from "../models/userModel.js";
import {AppError} from '../utils/AppErrorHandler.js'


const isalreadyProcessed = async ({ eventId, eventType, eventSource }) => {
  try {
    const checkEventinDb = await processedEvent.create({
      eventId,
      eventType,
      eventSource,
    });
    return true;
  } catch (err) {
    if (err.code === 11000) console.log("Already processed");
    return false;
  }
};

export const processClerkWebhook = async (eventId, event) => {
  try {
    const shouldProcess = await isalreadyProcessed({
      eventId,
      eventType: event.type,
      eventSource: "clerk",
    });
    if (shouldProcess) {
      switch (event.type) {
        case "user.created":
          await userModel.create({
            clerkUserId: event.data.id,
          });
          break;
        case "user.deleted":
          await userModel.findOneAndDelete({ clerkUserId: event.data.id });

          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

    }
  } catch (err) {
    console.error("Error processing clerk webhook:", err.message);
    // Return 500 so Clerk retries later
    throw new AppError("Processing failed", 500);
  }
};
