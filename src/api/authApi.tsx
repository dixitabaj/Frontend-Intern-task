import { authClient } from "./authClient";
// Shared auth types for login request and response payloads.
import type { LoginCredentials, LoginResponse } from "../types";

// login function that sends a POST request to the /login endpoint 
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await authClient.post<LoginResponse>("/login", credentials);
  return data;
}

