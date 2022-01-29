import { AxiosResponse } from 'axios';
import { api } from '../api';

export interface AuthServiceRequest {
  email: string;
  password: string;
}

export interface AuthServiceResponse {
  token: string;
}

export const authService = ({
  email,
  password,
}: AuthServiceRequest): Promise<AxiosResponse<AuthServiceResponse>> => {
  return api.post('/login', { email, password });
};
