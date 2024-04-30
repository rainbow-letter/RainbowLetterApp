import apiRequest from '.';

type Profile = {
  email: string;
  password?: string;
};

export const tryLogin = async (data: Profile) => {
  const response = await apiRequest.post('api/members/login', data);

  return response;
};

export const trySignUp = async (data: Profile) => {
  const response = await apiRequest.post('api/members', data);

  return response;
};

export const submitEmail = async (data: Profile) => {
  const response = await apiRequest.post('api/members/password/find', data);

  return response;
};
