import e from 'express'
import { PORT } from './config/config.js'
import connectDB from './config/db.js'
const app = e()

app.use(e.json())

app.get('/', async (req, res) => {
  const db = await connectDB()
  const query = 'SELECT * FROM appointments;'
  const [results] = await db.query(query)
  res.json(results)
})

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})
