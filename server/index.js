import e from 'express'
import { PORT } from './config/config.js'
import { sequelize } from './config/db.js'
const app = e()

app.use(e.json())

app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate()
    console.log('Conexión exitosa.')
    res.send('Inicio')
  } catch (error) {
    console.log('Error al conectar a la base de datos')
  }
})

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
