import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TimesheetInterface {
  id?: string;
  hours_worked: number;
  date: any;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TimesheetGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
