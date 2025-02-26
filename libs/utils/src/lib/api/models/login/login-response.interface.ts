export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  authToken: string;
}
