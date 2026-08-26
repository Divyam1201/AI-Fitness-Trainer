import { processWebhook } from "../services/webhookServices.js";
import { AppError, catchError } from "../utils/AppErrorHandler.js";

export const handleVapiWebhook = catchError(async (req, res) => {
  const messageId = req.headers["x-vapi-message-id"];
  const timestamp = req.headers["x-timestamp"];
  const signatureHeader = req.headers["x-signature"];
  const rawBody = req.body.toString("utf8");

  if (!messageId || !timestamp || !signatureHeader) {
    throw new AppError("Missing signature headers", 400);
  }

  const event = JSON.parse(rawBody);
  if (event.message.type === "end-of-call-report") {
    const processWebhookStatus = await processWebhook(
      messageId,
      { ...event.message },
      "vapi",
    );
    console.log(processWebhookStatus);
    res.status(200).send("ok");
  }
});
