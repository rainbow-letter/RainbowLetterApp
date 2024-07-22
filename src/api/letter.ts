import { ApiResponse } from '../model/Api.model';
import { createRequestURL } from './config/requestConfig';
import { AxiosRequest } from './config';
import { WriteLetter } from '../model/Letter.model';

const accountUrl = createRequestURL('api');

export const createLetter = (
  token: string,
  petId: number,
  data: WriteLetter,
): ApiResponse<any> => {
  const config = {
    url: accountUrl(`/letters?pet=${petId}`),
    method: 'POST',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};
