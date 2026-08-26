import express from "express"
import { handleAddUserNewDietPlan, handlegetUserDietPlan } from "../controllers/dietController.js"

const dietRouter = express.Router()

dietRouter.get("/",handlegetUserDietPlan)

export default dietRouter