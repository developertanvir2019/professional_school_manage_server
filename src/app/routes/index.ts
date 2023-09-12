import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
const router = express.Router();

router.use('/users', UserRoutes);
router.use('/academic-semesters', AcademicSemisterRoutes);

export default router;
