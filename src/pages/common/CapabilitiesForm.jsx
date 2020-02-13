import React from "react";

import CapabilitiesLeftContent from "../../components/CapabilitiesFormComponents/CapabilitiesLeftContent";
import CapabilitiesRightContent from "../../components/CapabilitiesFormComponents/CapabilitiesRightContent";

import Grid from "@material-ui/core/Grid";

function CapabilitiesForm() {
  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={4}>
        <CapabilitiesLeftContent />
      </Grid>
      <Grid item xs={4}>
        <CapabilitiesRightContent />
      </Grid>
    </Grid>
  );
}

export default CapabilitiesForm;
