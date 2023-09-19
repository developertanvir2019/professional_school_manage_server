import { Schema, model } from 'mongoose';
import {
  IAcademicSemister,
  AcademicSemisterModel,
} from './academicSemister.interface';
import { month } from './academicSemister.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: month,
    },
  },
  {
    timestamps: true,
  },
);

academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exists',
    );
  }
  next();
});

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema,
);

// handling same year and same semester issue.
