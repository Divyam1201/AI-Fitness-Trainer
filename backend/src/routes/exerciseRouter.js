import express from "express"
import { handlegetUserExPlan } from "../controllers/exerciseController.js"

const exerciseRouter = express.Router()

exerciseRouter.get('/',handlegetUserExPlan)

export default exerciseRouter