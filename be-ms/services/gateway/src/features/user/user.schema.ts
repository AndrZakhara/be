import { z } from "zod";
import { ERROR_MESSAGES } from "@shared/constants/errorMessages";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, ERROR_MESSAGES.USERNAME_TOO_SHORT)
    .max(30, ERROR_MESSAGES.USERNAME_TOO_LONG),
  email: z
    .email({ error: ERROR_MESSAGES.EMAIL_INVALID })
    .nonempty(ERROR_MESSAGES.EMAIL_REQUIRED),
  password: z
    .string()
    .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(8, { message: ERROR_MESSAGES.PASSWORD_TOO_SHORT })
    .max(50, { message: ERROR_MESSAGES.PASSWORD_TOO_LONG })
    .refine((password) => /[A-Z]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_UPPERCASE_REQUIRED,
    })
    .refine((password) => /[a-z]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_LOWERCASE_REQUIRED,
    })
    .refine((password) => /[0-9]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_NUMBER_REQUIRED,
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR_REQUIRED,
    }),
  firstName: z
    .string()
    .min(1, { message: ERROR_MESSAGES.FIRST_NAME_TOO_SHORT })
    .max(50, { message: ERROR_MESSAGES.FIRST_NAME_TOO_LONG })
    .nonempty(ERROR_MESSAGES.FIRST_NAME_REQUIRED),
  lastName: z
    .string()
    .min(3, { message: ERROR_MESSAGES.LAST_NAME_TOO_SHORT })
    .max(50, { message: ERROR_MESSAGES.LAST_NAME_TOO_LONG })
    .nonempty(ERROR_MESSAGES.LAST_NAME_REQUIRED),
  phone: z.string().refine((val) => /^\+?\d{10,15}$/.test(val), {
    message: ERROR_MESSAGES.PHONE_INVALID,
  }),
});

export const loginSchema = z.object({
  email: z
    .email({ error: ERROR_MESSAGES.EMAIL_INVALID })
    .nonempty(ERROR_MESSAGES.EMAIL_REQUIRED),
  password: z
    .string()
    .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(8, { message: ERROR_MESSAGES.PASSWORD_TOO_SHORT })
    .max(50, { message: ERROR_MESSAGES.PASSWORD_TOO_LONG })
    .refine((password) => /[A-Z]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_UPPERCASE_REQUIRED,
    })
    .refine((password) => /[a-z]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_LOWERCASE_REQUIRED,
    })
    .refine((password) => /[0-9]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_NUMBER_REQUIRED,
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR_REQUIRED,
    }),
});
