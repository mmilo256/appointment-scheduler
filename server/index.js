import e from 'express'
import cors from 'cors'
import userRouter from './modules/users/userRoutes.js'
import departmentRouter from './modules/departments/departmentRoutes.js'
import authRouter from './auth/authRoutes.js'
import citizenRouter from './modules/citizens/citizenRoutes.js'
import appointmentRouter from './modules/appointments/appointmentRoutes.js'
import referralRouter from './modules/referrals/referralRoutes.js'
import emailRoutes from './modules/email/emailRoutes.js'
import { verifyToken } from './auth/authMiddleware.js'
import { PORT } from './config/config.js'
import initializeDB from './config/init.js'
const app = e()

// Habilitar CORS
app.use(cors())

// Inicializar base de datos (esto se realiza de forma asíncrona)
await initializeDB();

// Quita la marca de express del header
app.disable('x-powered-by')

// Muestra como JSON las peticiones POST con el Content Type = application/json
app.use(e.json())

// Rutas
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/departments', verifyToken, departmentRouter)
app.use('/api/citizens', verifyToken, citizenRouter)
app.use('/api/appointments', verifyToken, appointmentRouter)
app.use('/api/referrals', verifyToken, referralRouter)
app.use('/api/email', emailRoutes)

// Arrancar el servidor
app.listen(PORT, () => {
  console.log('El servidor está levantado en el puerto: ' + PORT)
})
