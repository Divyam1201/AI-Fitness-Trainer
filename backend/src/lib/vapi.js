import Vapi from "@vapi-ai/web"
import { ENV } from "./env"

export const vapi = new Vapi(ENV.VAPI_API_KEY)