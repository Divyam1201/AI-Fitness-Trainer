import { processedEvent } from "../models/webhookEventModel.js";
import { userModel } from "../models/userModel.js";
import { vapiCallHistoryModel } from "../models/vapiCallHistoryModel.js";
import { AppError, generateDietAndWorkoutPlan } from "../utils/index.js";
import { handleAddUserNewExPlan } from "../controllers/exerciseController.js";
import { handleAddUserNewDietPlan } from "../controllers/dietController.js";
import { sendUserPlan } from "./serverEvent.js";
import { editUserDets } from "./userService.js";
import { generateAndStoreNewPlan } from "../utils/generateAndStoreNewPlan.js";

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

export const processWebhook = async (eventId, event, eventSource) => {
  try {
    const shouldProcess = await isalreadyProcessed({
      eventId,
      eventType: event.type,
      eventSource,
    });
    if (shouldProcess) {
      if (eventSource === "clerk") {
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
        return "clerk webhook processed";
      } else {
        const structuredData = event.analysis.structuredData;
        const clerkUserId = event.call?.assistantOverrides.variableValues.clerkUserId
        const callId = event.call.id
        await vapiCallHistoryModel.create({
          clerkUserId,
          callId,
          intake: {
            ...structuredData,
          },
          rawStructuredData:event
        });

        if (
          !Object.values(structuredData).some(
            (i) => i === "" || i === null || i === undefined,
          )
        ) {
          await generateAndStoreNewPlan(structuredData,clerkUserId ,callId)
        }

        return "vapi webhook processed";
      }
    }
    return "webhook already processed"
  } catch (err) {
    console.error(`Error processing ${eventSource} webhook:`, err.message);
    // Return 500 so Clerk retries later
    throw new AppError("Processing failed", 500);
  }
};
