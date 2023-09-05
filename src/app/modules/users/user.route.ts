import express from 'express';
import { UserContoller } from './user.contoller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserContoller.createUser,
);

export const UserRoutes = router;
