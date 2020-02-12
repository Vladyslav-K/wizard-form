import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  syncDatabaseWithContactsData,
  setMainLanguage,
  setFacebookLink,
  setGitHubLink,
  setCompany,
  setPhone,
  setFax
} from "../../domain/contactsFormDomain/contactsFormActions";

import ContactsLeftContent from "../../components/ContactsFormComponents/ContactsLeftContent";
import ContactsRightContent from "../../components/ContactsFormComponents/ContactsRightContent";

import Grid from "@material-ui/core/Grid";

function ContactsForm({
  mainLanguage,
  facebookLink,
  gitHubLink,
  company,
  phone,
  fax,

  syncDatabaseWithContactsData,
  setMainLanguage,
  setFacebookLink,
  setGitHubLink,
  setCompany,
  setPhone,
  setFax
}) {
  const [numberOfPhones, setNumberOfPhones] = useState(1);

  useEffect(() => {
    return () => syncDatabaseWithContactsData();
  });

  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={4}>
        <ContactsLeftContent
          mainLanguage={mainLanguage}
          facebookLink={facebookLink}
          gitHubLink={gitHubLink}
          company={company}
          setMainLanguage={setMainLanguage}
          setFacebookLink={setFacebookLink}
          setGitHubLink={setGitHubLink}
          setCompany={setCompany}
        />
      </Grid>

      <Grid item xs={4}>
        <ContactsRightContent
          numberOfPhones={numberOfPhones}
          setNumberOfPhones={setNumberOfPhones}
          phone={phone}
          fax={fax}
          setPhone={setPhone}
          setFax={setFax}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({
  contacts: { mainLanguage, facebookLink, gitHubLink, company, phone, fax }
}) => {
  return { mainLanguage, facebookLink, gitHubLink, company, phone, fax };
};

export default connect(mapStateToProps, {
  syncDatabaseWithContactsData,
  setMainLanguage,
  setFacebookLink,
  setGitHubLink,
  setCompany,
  setPhone,
  setFax
})(ContactsForm);
