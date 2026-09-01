import express from "express"
import { handleAINewPlanCreation } from "../controllers/aiController.js"

const aiRouter = express.Router()

aiRouter.post("/",handleAINewPlanCreation)

export default aiRouter