export interface UserPayload {
  id: number;
  username: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
}
