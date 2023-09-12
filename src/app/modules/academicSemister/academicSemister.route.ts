import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidation } from './academicSemister.validation';
const router = express.Router();

router.post(
  'create-user',
  validateRequest(AcademicSemisterValidation.createAcademicZodSchema),
);

export const AcademicSemisterRoutes = router;
