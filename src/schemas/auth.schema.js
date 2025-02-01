import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid emails" }),
  password: z
    .string({
      required_error: "pass required",
    })
    .min(6, { message: "minimo 6" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email required" })
    .email({ message: "Invalid email" }),
  password: z.string({ required_error: "password is required" }),
});
