type Role = 'ROLE_USER' | 'ROLE_ADMIN';
type Provider = 'NONE' | 'GOOGLE' | 'NAVER' | 'KAKAO';

export type ErrorData = {
  category: string;
  message: string;
};

export interface LoginResponse {
  grantType: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface EmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  password: string;
  newPassword: string;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  phoneNumber: string;
  role: Role;
  provider: Provider;
  lastLoggedIn: Date;
  lastChangedPassword: Date;
  createdAt: Date;
}

export interface PhoneNumberRequest {
  phoneNumber: string | undefined;
}
