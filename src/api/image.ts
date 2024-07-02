import { AxiosRequest } from './config';
import { createRequestURL } from './config/requestConfig';
import { ApiResponse } from '../model/Api.model';

const accountUrl = createRequestURL('/api/images');

export const getPetImage = (token: string, key: string): ApiResponse<any> => {
  const config = {
    url: accountUrl(`/resources/${key}`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};
