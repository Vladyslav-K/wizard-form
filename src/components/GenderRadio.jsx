import React, { memo } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const GenderRadio = ({ field, form }) => {
  return (
    <FormControl component="fieldset" style={{ marginTop: "22px" }}>
      <span>Gender</span>
      <RadioGroup
        aria-label="position"
        value={field.value}
        row
        onChange={event => form.setFieldValue(field.name, event.target.value)}
      >
        <Grid container justify="space-between" style={{ width: "70%" }}>
          <FormControlLabel
            labelPlacement="end"
            value="Male"
            label="Male"
            control={<Radio color="primary" />}
          />

          <FormControlLabel
            labelPlacement="end"
            value="Female"
            label="Female"
            control={<Radio color="primary" />}
          />
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default memo(GenderRadio);
