import * as yup from 'yup';

export const timesheetValidationSchema = yup.object().shape({
  hours_worked: yup.number().integer().required(),
  date: yup.date().required(),
  user_id: yup.string().nullable(),
});
