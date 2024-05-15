export interface UserPayload {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  access_token: string;
}
