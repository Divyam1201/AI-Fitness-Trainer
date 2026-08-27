import express from 'express'
import { handleGetUser, handleUpdateUser } from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.get("/",handleGetUser)
userRouter.put("/",handleUpdateUser)

export default userRouter