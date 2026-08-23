import express from 'express'
import { handleClerkWebhook } from '../controllers/handleClerkWebhook.js'
import { handleVapiWebhook } from '../controllers/handleVapiWebhook.js'

export const webhookRouter = express.Router()

webhookRouter.post('/clerk',express.raw({ type: 'application/json' }),handleClerkWebhook)
webhookRouter.post('/vapi',express.raw({ type: 'application/json' }),handleVapiWebhook)