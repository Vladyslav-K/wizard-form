import React from "react";
import { connect } from "react-redux";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { setContactsAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import ContactsForm from "./ContactsForm";

function ContactsFormContainer({
  setContactsAsSubmitted,
  setTemporaryUserData,
  saveChangeToRedux,
  temporaryUserData
}) {
  const handleSubmit = () => {
    setContactsAsSubmitted();
    setQueryStringIndex("step", 3);
  };

  return (
    <ContactsForm
      temporaryUserData={temporaryUserData}
      saveChangeToRedux={saveChangeToRedux}
      handleSubmit={handleSubmit}
    />
  );
}

export default connect(({ temporaryUserData }) => ({ temporaryUserData }), {
  setContactsAsSubmitted,
  setTemporaryUserData
})(ContactsFormContainer);
