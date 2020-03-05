export const TEMPORARY_USER_ID = 1;

export const CAPABILITIES_TAB_INDEX = 3;

export const CONTACTS_TAB_INDEX = 2;

export const PROFILE_TAB_INDEX = 1;

export const ACCOUNT_TAB_INDEX = 0;

export const MAX_AVATAR_IMAGE_SIZE = 1000000;

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

export const tabs = {
  capabilities: CAPABILITIES_TAB_INDEX,
  contacts: CONTACTS_TAB_INDEX,
  profile: PROFILE_TAB_INDEX,
  account: ACCOUNT_TAB_INDEX
};
