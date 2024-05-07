import { ApiResponse } from '../model/Api.model';
import { AxiosRequest } from './config';
import { createRequestURL } from './config/requestConfig';
import {
  LoginResponse,
  LoginRequest,
  SignUpResponse,
  EmailRequest,
  ResetPasswordRequest,
  UserInfoResponse,
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

export const submitEmail = (data: EmailRequest) => {
  const config = {
    url: accountUrl('/members/password/find'),
    method: 'POST',
    data,
  };

  return AxiosRequest(config);
};

export const updatePassword = (data: ResetPasswordRequest) => {
  const config = {
    url: accountUrl('/members/password'),
    mathod: 'PUT',
    data,
  };

  return AxiosRequest(config);
};

export const getUserInfo = (token: string): ApiResponse<UserInfoResponse> => {
  const config = {
    url: accountUrl('/members/info'),
    mathod: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(config);

  return AxiosRequest(config);
};
