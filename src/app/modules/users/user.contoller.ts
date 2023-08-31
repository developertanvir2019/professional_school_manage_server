import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user create success',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      error: err,
    })
  }
}

export default {
  createUser,
}
