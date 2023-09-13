import cors from 'cors';
import express, { NextFunction } from 'express';
import { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/GlobalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemisterRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route is not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api is not found',
      },
    ],
  });
  next();
});
export default app;
