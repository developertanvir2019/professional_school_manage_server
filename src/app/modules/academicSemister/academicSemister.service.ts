import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academincSemister.model';

const createSemister = async (
  payload: IAcademicSemister,
): Promise<IAcademicSemister> => {
  if (academicSemesterMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

export const AcademicSemisterService = {
  createSemister,
};
