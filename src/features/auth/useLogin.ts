import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi";
import { useAuth } from "./AuthContext";
import type { LoginCredentials } from "../../types";

// custom hook to handle login logic, including calling the API and updating auth context
export function useLogin() {
  const { loginWithToken } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      loginWithToken(data.token);
    },
  });
}
