import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi";
import { useAuth } from "./AuthContext";
import type { LoginCredentials } from "../../types";

// Mutation hook that submits credentials, stores the token, and updates auth state.
export function useLogin() {
  const { loginWithToken } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      loginWithToken(data.token);
    },
  });
}
