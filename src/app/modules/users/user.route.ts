import express from 'express'
import { UserContoller } from './user.contoller'
const router = express.Router()
router.post('/create-user', UserContoller.createUser)

export const UserRoutes = router
