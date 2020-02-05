import React from "react";
import { Field } from "formik";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";

export default function InputField({ label, name }) {
  return (
    <FormControl margin="normal" variant="outlined" size="small">
      <span> {label} </span>
      <Field name={name} type="input" as={OutlinedInput} />
    </FormControl>
  );
}
