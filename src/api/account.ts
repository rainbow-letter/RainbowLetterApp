import apiRequest from '.';

type Profile = {
  email: string;
  password?: string;
};

type ResetPassword = {
  newPassword: string;
};

export const tryLogin = async (data: Profile) => {
  const response = await apiRequest.post('api/members/login', data);

  return response.data;
};

export const trySignUp = async (data: Profile) => {
  const response = await apiRequest.post('api/members', data);

  return response.data;
};

export const submitEmail = async (data: Profile) => {
  const response = await apiRequest.post('api/members/password/find', data);

  return response.data;
};

export const updatePassword = async (data: ResetPassword) => {
  const response = await apiRequest.put('api/members/password/reset', data);

  return response.data;
};
