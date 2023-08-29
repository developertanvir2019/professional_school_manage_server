import cors from 'cors'
import express from 'express'
import { Application, Request, Response } from 'express'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req: Request, res: Response) => {
  res.send('working successfully for home route')
})

export default app
