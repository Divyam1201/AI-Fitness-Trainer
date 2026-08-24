import express from "express"
import { handleAddNewUserExPlan, handlegetUserExPlan } from "../controllers/exerciseController.js"

const exerciseRouter = express.Router()

exerciseRouter.get('/',handlegetUserExPlan)
exerciseRouter.post('/',handleAddNewUserExPlan)

export default exerciseRouter