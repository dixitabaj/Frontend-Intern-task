import { describe, it, expect } from "vitest";
import { loginSchema } from "./loginSchema";

describe("loginSchema", () => {
  it("accepts valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email format", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "cityslicka",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "cityslicka",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a password shorter than 5 characters", () => {
    const result = loginSchema.safeParse({
      email: "eve.holt@reqres.in",
      password: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      email: "eve.holt@reqres.in",
      password: "",
    });
    expect(result.success).toBe(false);
  });
});
