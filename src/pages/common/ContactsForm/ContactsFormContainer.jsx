import React from "react";
import { connect } from "react-redux";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { setContactsAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import { ContactsForm } from "./ContactsForm";

function ConnectedContactsFormContainer({
  setContactsAsSubmitted,
  setTemporaryUserData,
  saveChangeToRedux,

  contactsData
}) {
  const handleSubmit = () => {
    setContactsAsSubmitted();
    setQueryStringIndex("step", 3);
  };

  return (
    <ContactsForm
      contactsData={contactsData}
      saveChangeToRedux={saveChangeToRedux}
      handleSubmit={handleSubmit}
    />
  );
}

export const ContactsFormContainer = connect(
  ({
    temporaryUserData: {
      mainLanguage,
      facebookLink,
      gitHubLink,
      company,
      phones,
      fax
    }
  }) => ({
    contactsData: {
      mainLanguage,
      facebookLink,
      gitHubLink,
      company,
      phones,
      fax
    }
  }),
  {
    setContactsAsSubmitted,
    setTemporaryUserData
  }
)(ConnectedContactsFormContainer);
