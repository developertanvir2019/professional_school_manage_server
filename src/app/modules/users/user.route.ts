import express from 'express'
import userContoller from './user.contoller'
const router = express.Router()
router.post('/create-user', userContoller.createUser)

export default router
