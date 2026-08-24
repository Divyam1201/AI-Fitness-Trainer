import express from "express"
import { handleAddUserNewDietPlan } from "../controllers/dietController.js"

const dietRouter = express.Router()

// dietRouter
dietRouter.post('/',handleAddUserNewDietPlan)

export default dietRouter