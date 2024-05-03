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
