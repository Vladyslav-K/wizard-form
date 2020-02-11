import React, { memo } from "react";
import { Field } from "formik";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

const InputField = ({ label, name, value, onChange, required }) => {
  return (
    <FormControl
      onChange={onChange}
      variant="outlined"
      margin="normal"
      size="small"
    >
      <Grid container justify="space-between">
        <span> {label} </span>
        {required && <span> * </span>}
      </Grid>

      <Field as={OutlinedInput} value={value} type="input" name={name} />
    </FormControl>
  );
};

export default memo(InputField);
