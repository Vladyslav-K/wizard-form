import * as Yup from "yup";

export const loginAndPasswordValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "User name must be at least 2 characters!")
    .max(10, "User name must be 10 characters or less!")
    .required("User name is required!"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .max(20, "Password must be 10 characters or less!")
    .required("Password is required!"),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords are not the same!")
    .required("Password confirmation is required!")
});
