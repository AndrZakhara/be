import mongoose from "mongoose";

export const validateObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return passwordRegex.test(password);
};

export const validateNonEmptyString = (value: string): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

export const validateUsername = (username: string): boolean => {
  // Alphanumeric and underscores, 3-30 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

  return usernameRegex.test(username);
};
export const validatePhoneNumber = (phone: string): boolean => {
  // Simple phone number validation (you can enhance this as needed)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  return phoneRegex.test(phone);
};
