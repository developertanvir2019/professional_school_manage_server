import { NextFunction, Request, Response } from 'express';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemister } from './academicSemister.interface';

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result =
      await AcademicSemisterService.createSemister(academicSemesterData);

    sendResponse<IAcademicSemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    });
    next();
  },
);

export const AcademicSemisterContoller = {
  createSemister,
};
