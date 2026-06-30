export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Response shape from ReqRes's POST /api/login.
 * https://reqres.in/api/login
 */
export interface LoginResponse {
  token: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}
