import dotenv from "dotenv"
dotenv.config()

export const ENV = {
    PORT:process.env.PORT,
    APP_ENV:process.env.APP_ENV,
    CLERK_PUBLISHABLE_KEY=process.env.CLERK_PUBLISHABLE_KEY,
CLERK_SECRET_KEY=process.env.CLERK_SECRET_KEY,
VAPI_WORKFLOW_ID=process.env.VAPI_WORKFLOW_ID,
VAPI_API_KEY = process.env.VAPI_API_KEY
}