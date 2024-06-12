import e from 'express'
import cors from 'cors'
import { PORT } from './config/config.js'
import userRouter from './modules/users/userRoutes.js'
import departmentRouter from './modules/departments/departmentRoutes.js'
import authRouter from './auth/authRoutes.js'
import citizenRouter from './modules/citizens/citizenRoutes.js'
import appointmentRouter from './modules/appointments/appointmentRoutes.js'
import referralRouter from './modules/referrals/referralRoutes.js'
import { verifyToken } from './auth/authMiddleware.js'
const app = e()

// Habilitar CORS
app.use(cors())

// Quita la marca de express del header
app.disable('x-powered-by')

// Muestra como JSON las peticiones POST con el Content Type = application/json
app.use(e.json())

// Rutas
app.use('/api/auth', authRouter)
app.use('/api/users', verifyToken, userRouter)
app.use('/api/departments', verifyToken, departmentRouter)
app.use('/api/citizens', verifyToken, citizenRouter)
app.use('/api/appointments', appointmentRouter)
app.use('/api/referrals', verifyToken, referralRouter)

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
