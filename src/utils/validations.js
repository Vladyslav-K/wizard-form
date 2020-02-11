import * as Yup from "yup";

export const loginAndPasswordValidationSchema = Yup.object().shape({
  username: Yup.string().required("User name is required!"),

  password: Yup.string().required("Password is required!"),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords are not the same!")
    .required("Password confirmation is required!")
});
