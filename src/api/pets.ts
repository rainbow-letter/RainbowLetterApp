import { AxiosRequest } from './config';
import { createRequestURL } from './config/requestConfig';
import { PetDashBoard } from '../model/Home.model';
import { ApiResponse } from '../model/Api.model';

const accountUrl = createRequestURL('/api/pets');

export const getDashBoardPets = (
  token: string,
): ApiResponse<{ pets: PetDashBoard[] }> => {
  const config = {
    url: accountUrl('/dashboard'),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};
