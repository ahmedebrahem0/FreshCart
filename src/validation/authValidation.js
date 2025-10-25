import * as yup from "yup";

// Login Validation Schema
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
});

// Register Validation Schema
export const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
  rePassword: yup
    .string()
    .required("Re-entering password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^01[01235][0-9]{8}$/, "Invalid phone number"),
});

// Forget Password Validation Schema
export const forgetPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

// Reset Code Validation Schema
export const resetCodeValidationSchema = yup.object().shape({
  resetCode: yup
    .string()
    .required("Reset code is required")
    .length(6, "Reset code must be exactly 6 characters")
    .matches(/^[0-9]+$/, "Reset code must contain only numbers"),
});

// Reset Password Validation Schema
export const resetPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(3, "Password must be at least 3 characters"),
});

// Change Password Validation Schema
export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required"),
  password: yup
    .string()
    .required("New password is required")
    .min(3, "Password must be at least 3 characters")
    .notOneOf([yup.ref("currentPassword")], "New password must be different from current password"),
  rePassword: yup
    .string()
    .required("Re-entering password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

// Payment Validation Schema
export const paymentValidationSchema = yup.object().shape({
  details: yup
    .string()
    .required("Address details are required")
    .min(4, "Address details must be at least 4 characters")
    .max(50, "Address details must be less than 50 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^01[01235][0-9]{8}$/, "Invalid phone number"),
  city: yup
    .string()
    .required("City is required")
    .min(4, "City must be at least 4 characters")
    .max(10, "City must be less than 10 characters"),
}); 