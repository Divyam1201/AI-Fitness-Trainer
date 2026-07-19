import dotenv from "dotenv"
dotenv.config({ quiet: true })

export const ENV = {
    PORT:process.env.PORT,
    APP_ENV:process.env.APP_ENV,
    DB_CONN_STG:process.env.DB_CONN_STG,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
CLERK_WEBHOOK_SECRET:process.env.CLERK_WEBHOOK_SECRET,
VAPI_WORKFLOW_ID:process.env.VAPI_WORKFLOW_ID,
VAPI_API_KEY : process.env.VAPI_API_KEY
}