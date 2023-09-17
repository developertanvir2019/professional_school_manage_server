import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
import { AcademicSemister } from './academincSemister.model';
import { IPaginationOption } from '../../../interfaces/pagination';
import { paginationHelper } from '../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

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
  filters: { searchTerm: string },
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const academicSemesterSearchableFields = ['title', 'code', 'year'];
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await AcademicSemister.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
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
