import { z } from 'zod';
import { month } from './academicSemister.constant';

const createAcademicZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'semister code is reeded',
    }),
    startMonth: z.enum([...month] as [string, ...string[]], {
      required_error: 'start month is needed',
    }),
    endMonth: z.enum([...month] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});

export const AcademicSemisterValidation = {
  createAcademicZodSchema,
};
