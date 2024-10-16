import { AxiosRequest, AxiosRequestWithImage } from './config';
import { createRequestURL } from './config/requestConfig';
import { PetDashBoard } from '../model/Home.model';
import { ApiResponse } from '../model/Api.model';
import { PetsList } from '../model/Pet.model';

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

export const registerPetInfo = (token: string, data: any) => {
  const config = {
    url: accountUrl(''),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return AxiosRequestWithImage(config);
};

export const getPetList = (
  token: string,
): ApiResponse<{ pets: PetsList[] }> => {
  const config = {
    url: accountUrl(''),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};

export const getPetInfo = (token: string, id: number) => {
  const config = {
    url: accountUrl(`/${id}`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};

export const updatePetInfo = (token: string, id: number, data: any) => {
  const config = {
    url: accountUrl(`/${id}`),
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return AxiosRequestWithImage(config);
};
