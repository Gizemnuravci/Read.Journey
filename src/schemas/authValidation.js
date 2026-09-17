import * as yup from "yup";

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(emailPattern, "Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

export const addBookSchema = yup.object().shape({
  title: yup.string().required("Book title is required"),
  author: yup.string().required("Author is required"),
  totalPages: yup
    .number()
    .typeError("Pages must be a number")
    .positive("Must be greater than 0")
    .required("Number of pages is required"),
});

export const readingSchema = yup.object().shape({
  page: yup
    .number()
    .typeError("Page must be a number")
    .positive("Must be greater than 0")
    .required("Page number is required"),
});
