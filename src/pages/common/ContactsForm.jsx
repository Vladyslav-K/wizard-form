import React from "react";

import ContactsLeftContent from "../../components/ContactsFormComponents/ContactsLeftContent";
import ContactsRightContent from "../../components/ContactsFormComponents/ContactsRightContent";

import Grid from "@material-ui/core/Grid";

function ContactsForm() {
  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={4}>
        <ContactsLeftContent />
      </Grid>

      <Grid item xs={4}>
        <ContactsRightContent />
      </Grid>
    </Grid>
  );
}

export default ContactsForm;
