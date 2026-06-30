import { z } from "zod";

// common validation schema for the login form
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
