import express from 'express'
import { handleServerEvent } from '../controllers/serverEventController.js'

const eventRouter = express.Router()

eventRouter.get('/:id',handleServerEvent)

export default eventRouter