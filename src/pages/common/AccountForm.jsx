import React from "react";

import AccountLeftContent from "../../components/AccountFormComponents/AccountLeftContent";
import AccountRightContent from "../../components/AccountFormComponents/AccountRightContent";

import Grid from "@material-ui/core/Grid";

function AccountForm() {
  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={3}>
        <AccountLeftContent />
      </Grid>
      <Grid item xs={5}>
        <AccountRightContent />
      </Grid>
    </Grid>
  );
}

export default AccountForm;
