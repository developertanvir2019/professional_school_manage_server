import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidation } from './academicSemister.validation';
import { AcademicSemisterContoller } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemisterValidation.createAcademicZodSchema),
  AcademicSemisterContoller.createSemister,
);

router.get('/', AcademicSemisterContoller.getAllSemister);

export const AcademicSemisterRoutes = router;
