import React from "react";

import UserAvatar from "../../components/UserAvatar";
import LoginAndPassword from "../../components/LoginAndPassword";

import Grid from "@material-ui/core/Grid";

function AccountForm() {
  return (
    <Grid container justify="space-around">
      <Grid item xs={3}>
        <UserAvatar />
      </Grid>

      <Grid item xs={6}>
        <LoginAndPassword />
      </Grid>
    </Grid>
  );
}

export default AccountForm;
