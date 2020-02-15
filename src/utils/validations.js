import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const AccountFormValidationSchema = Yup.object().shape({
  username: Yup.string().required("User name is required!"),

  password: Yup.string().required("Password is required!"),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords are not the same!")
    .required("Password confirmation is required!"),

  avatar: Yup.mixed()
    .test(
      "fileSize",
      "Image must be 1 MB or less!",
      image => image.size <= 1000000
    )
    .test("fileType", "Unsupported File Format", image =>
      SUPPORTED_FORMATS.includes(image.type)
    )
});
