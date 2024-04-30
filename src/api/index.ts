import axios from 'axios';
import { Platform } from 'react-native';
import Config from 'react-native-config';

const baseURL = Platform.OS === 'ios' ? Config.API_URL : Config.API_URL + '/';

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: '',
  },
});

baseInstance.interceptors.response.use(data => data);

const apiRequest = {
  get: (url: string, request?: any) => baseInstance.get(url, request),
  post: (url: string, data: any, config?: any) =>
    baseInstance.post(url, data, config),
  delete: (url: string, requset?: any) => baseInstance.delete(url, requset),
};

export default apiRequest;
