import React from "react";

import ProfileLeftContent from "../../components/ProfileFormComponents/ProfileLeftContent";
import ProfileRightContent from "../../components/ProfileFormComponents/ProfileRightContent";

import Grid from "@material-ui/core/Grid";

function ProfileForm() {
  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={4}>
        <ProfileLeftContent />
      </Grid>
      <Grid item xs={4}>
        <ProfileRightContent />
      </Grid>
    </Grid>
  );
}

export default ProfileForm;
