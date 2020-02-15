import React from "react";
import { connect } from "react-redux";

import { setContactsData } from "../../../domain/contactsFormDomain/contactsFormActions";

import ContactsForm from "./ContactsForm";

function ContactsFormContainer({
  setContactsData,
  mainLanguage,
  facebookLink,
  gitHubLink,
  company,
  phones,
  fax
}) {
  const saveChangeToRedux = value => {
    setContactsData({ ...value });
  };

  return (
    <ContactsForm
      saveChangeToRedux={saveChangeToRedux}
      mainLanguage={mainLanguage}
      facebookLink={facebookLink}
      gitHubLink={gitHubLink}
      company={company}
      phones={phones}
      fax={fax}
    />
  );
}

const mapStateToProps = ({
  contacts: { mainLanguage, facebookLink, gitHubLink, company, phones, fax }
}) => {
  return { mainLanguage, facebookLink, gitHubLink, company, phones, fax };
};

export default connect(mapStateToProps, { setContactsData })(
  ContactsFormContainer
);
