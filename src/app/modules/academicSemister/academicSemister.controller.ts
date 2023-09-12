import { RequestHandler } from 'express';
import { AcademicSemisterService } from './academicSemister.service';

const createSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemisterData } = req.body;
    const result =
      await AcademicSemisterService.createSemister(academicSemisterData);
    res.status(200).json({
      success: true,
      message: 'semester create success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemisterContoller = {
  createSemister,
};
