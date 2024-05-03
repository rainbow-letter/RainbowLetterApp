import { RawAxiosRequestConfig } from 'axios';

export const makeRequestConfig = <T, Q>(url: string) => {
  return (method: string, params?: Q, data?: T): RawAxiosRequestConfig => {
    const requestConfig: RawAxiosRequestConfig = {
      responseType: 'json',
      url,
      method,
    };

    if (data) {
      requestConfig.data = data;
    }

    if (params) {
      requestConfig.params = params;
    }

    return requestConfig;
  };
};

export const createRequestURL = (prefix: string) => {
  return (url?: string) => {
    const combineUrl = `${prefix}${url}`;

    return combineUrl;
  };
};
