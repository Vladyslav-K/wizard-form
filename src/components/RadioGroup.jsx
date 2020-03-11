import React, { memo } from "react";

// styles
import {
  FormControlLabel,
  FormControl,
  RadioGroup as MuiRadioGroup,
  Radio,
  Grid
} from "@material-ui/core";

export const RadioGroup = memo(({ field, form, value, label, saveUser }) => {
  return (
    <FormControl component="fieldset" style={{ marginTop: "22px" }}>
      <span> {label} </span>

      <MuiRadioGroup
        aria-label="position"
        value={field.value}
        row
        onChange={event => {
          saveUser({ [field.name]: event.target.value });
        }}>
        <Grid container justify="space-between" style={{ width: "70%" }}>
          {value.map(item => (
            <FormControlLabel
              labelPlacement="end"
              value={item}
              label={item}
              key={item}
              control={<Radio color="primary" />}
            />
          ))}
        </Grid>
      </MuiRadioGroup>
    </FormControl>
  );
});
