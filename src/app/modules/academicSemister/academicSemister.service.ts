import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academincSemister.model';
import { IPaginationOption } from '../../../interfaces/pagination';

const createSemister = async (
  payload: IAcademicSemister,
): Promise<IAcademicSemister> => {
  if (academicSemesterMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit: number;
    total: number;
  };
  data: T;
};

const getAllSemister = async (
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  const result = await AcademicSemister.find().sort().skip(skip).limit(limit);
  const total = await AcademicSemister.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemisterService = {
  createSemister,
  getAllSemister,
};
