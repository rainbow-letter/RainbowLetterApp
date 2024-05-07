export interface LoginResponse {
  grantType: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  email: string;
}

export interface EmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface PhoneNumberRequest {
  phoneNumber: string | undefined;
}
