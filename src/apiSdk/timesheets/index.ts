import axios from 'axios';
import queryString from 'query-string';
import { TimesheetInterface, TimesheetGetQueryInterface } from 'interfaces/timesheet';
import { GetQueryInterface } from '../../interfaces';

export const getTimesheets = async (query?: TimesheetGetQueryInterface) => {
  const response = await axios.get(`/api/timesheets${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTimesheet = async (timesheet: TimesheetInterface) => {
  const response = await axios.post('/api/timesheets', timesheet);
  return response.data;
};

export const updateTimesheetById = async (id: string, timesheet: TimesheetInterface) => {
  const response = await axios.put(`/api/timesheets/${id}`, timesheet);
  return response.data;
};

export const getTimesheetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/timesheets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTimesheetById = async (id: string) => {
  const response = await axios.delete(`/api/timesheets/${id}`);
  return response.data;
};
