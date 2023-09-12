import cors from 'cors';
import express from 'express';
import { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/GlobalErrorHandler';
import router from './app/routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemisterRoutes);

app.use(globalErrorHandler);

app.get('/', async (req: Request, res: Response) => {
  res.send('working successfully for home route');
});

export default app;
