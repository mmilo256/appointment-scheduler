import e from 'express'
import { sendEmail } from './emailController.js'

const router = e.Router()

router.post('/send-email', sendEmail)

export default router
