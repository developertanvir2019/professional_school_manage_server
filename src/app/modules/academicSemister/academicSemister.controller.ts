import { NextFunction, Request, Response } from 'express';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemister } from './academicSemister.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constance/pagination';

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

const getAllSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.shortOrder,
    // };
    const filters = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemisterService.getAllSemister(
      filters,
      paginationOptions,
    );
    sendResponse<IAcademicSemister[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semister received success',
      data: result.data,
    });
    next();
  },
);

export const AcademicSemisterContoller = {
  createSemister,
  getAllSemister,
};
