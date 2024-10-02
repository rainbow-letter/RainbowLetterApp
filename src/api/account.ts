import { ApiResponse } from '../model/Api.model';
import { AxiosRequest } from './config';
import { createRequestURL } from './config/requestConfig';
import {
  LoginResponse,
  LoginRequest,
  EmailRequest,
  ResetPasswordRequest,
  UserInfoResponse,
  PhoneNumberRequest,
} from '../model/Account.model';

const accountUrl = createRequestURL('api');

export const tryLogin = (data: LoginRequest): ApiResponse<LoginResponse> => {
  const config = {
    url: accountUrl('/users/login'),
    method: 'POST',
    data,
  };

  return AxiosRequest(config);
};

export const trySignUp = (data: LoginRequest) => {
  const config = {
    url: accountUrl('/users/create'),
    method: 'POST',
    data,
  };

  return AxiosRequest(config);
};

export const submitEmail = (data: EmailRequest) => {
  const config = {
    url: accountUrl('/users/find-password'),
    method: 'POST',
    data,
  };

  return AxiosRequest(config);
};

export const updatePassword = (data: ResetPasswordRequest, token: string) => {
  const config = {
    url: accountUrl('/users/password'),
    method: 'PUT',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};

export const getUserInfo = (token: string): ApiResponse<UserInfoResponse> => {
  const config = {
    url: accountUrl('/users/info'),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};

export const updatePhoneNumber = (data: PhoneNumberRequest, token: string) => {
  const config = {
    url: accountUrl('/users/phone-number'),
    method: 'PUT',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};

export const deleteUserInfo = (token: string) => {
  const config = {
    url: accountUrl('/users'),
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};
