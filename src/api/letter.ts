import { ApiResponse } from '../model/Api.model';
import { createRequestURL } from './config/requestConfig';
import { AxiosRequest } from './config';
import { WriteLetter, Letters, Letter } from '../model/Letter.model';

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

export const getLetterList = (
  token: string,
  petId: number,
): ApiResponse<{ letters: Letters[] }> => {
  const config = {
    url: accountUrl(`/letters/box?pet=${petId}`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};

export const getLetter = (token: string, id: number): ApiResponse<Letter> => {
  const config = {
    url: accountUrl(`/letters/${id}`),
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};

export const deleteLetter = (
  token: string,
  id: number,
): ApiResponse<Letter> => {
  const config = {
    url: accountUrl(`/letters/${id}`),
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return AxiosRequest(config);
};
