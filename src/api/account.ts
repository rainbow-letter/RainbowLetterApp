import { ApiResponse } from '../model/Api.model';
import { AxiosRequest } from './config';
import { createRequestURL } from './config/requestConfig';
import {
  LoginResponse,
  LoginRequest,
  SignUpResponse,
} from '../model/account.model';

const accountUrl = createRequestURL('api');

export const tryLogin = (data: LoginRequest): ApiResponse<LoginResponse> => {
  const config = {
    url: accountUrl('/members/login'),
    method: 'POST',
    data,
  };

  return AxiosRequest(config);
};

export const trySignUp = (data: LoginRequest): ApiResponse<SignUpResponse> => {
  const config = {
    url: accountUrl('/members'),
    method: 'POST',
    data,
  };

  return AxiosRequest(config);
};
