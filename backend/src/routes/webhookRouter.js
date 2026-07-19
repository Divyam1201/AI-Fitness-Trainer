import express from 'express'
import { handleClerkWebhook } from '../controllers/handleWebhooks.js'

export const webhookRouter = express.Router()

webhookRouter.post('/clerk',express.raw({ type: 'application/json' }),handleClerkWebhook)