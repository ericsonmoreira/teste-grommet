import { AxiosResponse } from 'axios';
import { api } from '../api';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

export interface ListUsersServiceResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}

export const listUsersService = (): Promise<
  AxiosResponse<ListUsersServiceResponse>
> => {
  return api.get('/users');
};
