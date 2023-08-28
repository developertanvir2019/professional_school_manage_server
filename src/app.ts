const express = require('express');
import cors from 'cors';
import { Application, Request, Response } from 'express';

const app: Application = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
app.get('/', (req: Request, res: Response) => {
    res.send('working successfully for home route')
})

export default app;