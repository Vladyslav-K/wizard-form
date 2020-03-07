import React, { memo } from "react";

import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Grid
} from "@material-ui/core";

export const GenderRadio = memo(({ field, form, handleBlur }) => {
  return (
    <FormControl component="fieldset" style={{ marginTop: "22px" }}>
      <span>Gender</span>
      <RadioGroup
        aria-label="position"
        value={field.value}
        row
        onChange={event => {
          form.setFieldValue(field.name, event.target.value);

          handleBlur({ [field.name]: event.target.value });
        }}>
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
});
