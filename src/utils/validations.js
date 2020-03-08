import * as Yup from "yup";
import { DateTime } from "luxon";
import { validateEditedUser } from "../utils/database.js";

const PHONE_AND_FAX_REGEXP = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

export const accountFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("User name is required!")
    .min(2, "Username must be more than two characters!")
    .max(20, "Username must be less than 20 characters!")
    .test("checkUsername", "User name already used", async value => {
      return await validateEditedUser("username", value);
    }),

  password: Yup.string()
    .required("Password is required!")
    .min(6, "Password must be more than two characters!")
    .max(20, "Password must be less than 20 characters!"),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords are not the same!")
    .required("Password confirmation is required!")
});

export const profileFormValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required!")
    .min(2, "First name must be more than two characters!")
    .max(20, "First name must be less than 20 characters!"),

  lastName: Yup.string()
    .required("Last name is required!")
    .min(2, "Last name must be more than two characters!")
    .max(20, "Last name must be less than 20 characters!"),

  birthDate: Yup.date()
    .required("Birth date is required!")
    .test("checkDate", "Invalid date!", value => {
      return DateTime.isDateTime(DateTime.fromJSDate(value));
    })
    .max(
      DateTime.local()
        .minus({ year: 18 })
        .toJSDate(),
      "You must be 18 or older to registration!"
    ),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required!")
    .test("checkEmail", "Email already used!", async value => {
      return await validateEditedUser("email", value);
    }),

  address: Yup.string().required("Address is required!")
});

export const contactsFormValidationSchema = Yup.object().shape({
  phones: Yup.array()
    .notRequired()
    .of(
      Yup.string().matches(PHONE_AND_FAX_REGEXP, {
        message: "Invalid phone number!"
      })
    ),

  fax: Yup.string("Fax is required!")
    .required()
    .matches(PHONE_AND_FAX_REGEXP, {
      message: "Invalid fax!"
    }),

  gitHubLink: Yup.string()
    .test("checkGithubLink", "Invalid link!", value => {
      if (value) {
        return value.includes("github");
      }

      return true;
    })
    .required("Github link is required!"),

  facebookLink: Yup.string()
    .test("checkFacebookLink", "Invalid link!", value => {
      if (value) {
        return value.includes("facebook");
      }

      return true;
    })
    .required("Facebook link is required!"),

  mainLanguage: Yup.string().required("Main language is required!")
});

export const capabilitiesFormValidationSchema = Yup.object().shape({
  skills: Yup.array()
    .required("Skills is required!")
    .min(3, "You must select at least 3 skills!"),

  additionalInformation: Yup.string()
    .notRequired()
    .max(300, "300 characters maximum!")
});
