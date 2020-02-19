import React from "react";
import { connect } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { setContactsAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setContactsData } from "../../../domain/contactsFormDomain/contactsFormActions";

import ContactsForm from "./ContactsForm";

function ContactsFormContainer({
  setContactsAsSubmitted,
  setContactsData,
  contacts
}) {
  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setContactsData({ ...formikValues });
  }, 250);

  const handleSubmit = () => {
    setContactsAsSubmitted();
    setQueryStringIndex("step", 3);
  };

  return (
    <ContactsForm
      saveChangeToRedux={saveChangeToRedux}
      handleSubmit={handleSubmit}
      contacts={contacts}
    />
  );
}

const mapStateToProps = ({ contacts }) => {
  return { contacts };
};

export default connect(mapStateToProps, {
  setContactsAsSubmitted,
  setContactsData
})(ContactsFormContainer);
