import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';

const DEFAULT_ACCEPT_TYPE = 'application/json';
const baseURL = Platform.OS === 'ios' ? Config.API_HOST : Config.API_HOST + '/';

let _token: string | null = null;
export const setAxiosToken = (token: typeof _token): void => {
  _token = token;
};

export const AxiosRequest = (
  config: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const instance = axios.create();
  instance.defaults.baseURL = baseURL;
  instance.defaults.headers['Content-Type'] = DEFAULT_ACCEPT_TYPE;

  const isTokenValid =
    typeof _token !== 'string' || _token !== 'null' || !_token;

  config.headers = config.headers || {};

  if (isTokenValid && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${_token}`;
  }

  return instance.request(config);
};

// Content-Type을 명시하지 않는 이미지 등록용
export const AxiosRequestWithImage = (
  config: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const instance = axios.create();
  instance.defaults.baseURL = baseURL;

  const isTokenValid =
    typeof _token !== 'string' || _token !== 'null' || !_token;

  config.headers = config.headers || {};

  if (isTokenValid && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${_token}`;
  }

  return instance.request(config);
};
