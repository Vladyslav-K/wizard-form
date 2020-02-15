import React from "react";
import { connect } from "react-redux";

import { setContactsData } from "../../domain/contactsFormDomain/contactsFormActions";

import ContactsLeftContent from "../../components/ContactsFormComponents/ContactsLeftContent";
import ContactsRightContent from "../../components/ContactsFormComponents/ContactsRightContent";

import Grid from "@material-ui/core/Grid";

function ContactsForm({
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
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={4}>
        <ContactsLeftContent
          saveChangeToRedux={saveChangeToRedux}
          mainLanguage={mainLanguage}
          facebookLink={facebookLink}
          gitHubLink={gitHubLink}
          company={company}
        />
      </Grid>

      <Grid item xs={4}>
        <ContactsRightContent
          saveChangeToRedux={saveChangeToRedux}
          phones={phones}
          fax={fax}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({
  contacts: { mainLanguage, facebookLink, gitHubLink, company, phones, fax }
}) => {
  return { mainLanguage, facebookLink, gitHubLink, company, phones, fax };
};

export default connect(mapStateToProps, { setContactsData })(ContactsForm);
