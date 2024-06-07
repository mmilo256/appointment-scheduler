import e from 'express'
import { PORT } from './config/config.js'
import userRouter from './modules/users/userRoutes.js'
import authRouter from './auth/authRoutes.js'
import { verifyToken } from './auth/authMiddleware.js'
const app = e()

// Quita la marca de express del header
app.disable('x-powered-by')

// Muestra como JSON las peticiones POST con el Content Type = application/json
app.use(e.json())

// Rutas
app.use('/api/users', verifyToken, userRouter)
app.use('/api/auth', authRouter)

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
