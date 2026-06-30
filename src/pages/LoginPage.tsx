import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { loginSchema, type LoginFormValues } from "../features/auth/loginSchema";
import { useLogin } from "../features/auth/useLogin";
import { useAuth } from "../features/auth/AuthContext";

// Login screen with form validation and redirect handling after authentication.
export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    // prefilled with the ReqRes test creds so it's easy to demo without typing them in every time
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });

  // redirect to dashboard once login succeeds
  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate("/dashboard", { replace: true });
    }
  }, [loginMutation.isSuccess, navigate]);

  // also covers the case where someone's already logged in and lands back on /login
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Task Dashboard</h1>
          <h1 className="text-sm mt-2 ml-1 font-normal text-gray-500">Please enter necessary credentials</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          {loginMutation.isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-700">
              Login failed. Please check your credentials and try again.
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg py-2.5 text-sm transition-colors mt-2"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}