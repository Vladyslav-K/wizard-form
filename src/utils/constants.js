export const TEMPORARY_USER_ID = 1;

export const CAPABILITIES_TAB_INDEX = 3;

export const CONTACTS_TAB_INDEX = 2;

export const PROFILE_TAB_INDEX = 1;

export const ACCOUNT_TAB_INDEX = 0;

export const fields = {
  account: {
    passwordConfirmation: "",
    password: "",
    username: "",
    avatar: ""
  },

  profile: {
    firstName: "",
    birthDate: "",
    lastName: "",
    address: "",
    gender: "",
    email: ""
  },

  contacts: {
    mainLanguage: "",
    facebookLink: "",
    gitHubLink: "",
    company: "",
    phones: [""],
    fax: ""
  },

  capabilities: {
    additionalInformation: "",
    hobbies: [],
    skills: []
  }
};
