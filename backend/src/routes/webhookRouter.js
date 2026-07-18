import express from 'express'

export const webhookRouter = express.Router()

webhookRouter.post('clerk',handleClerkWebhook)