import React from "react";
import { Field } from "formik";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";

export default function InputField({ label, name, value, onChange }) {
  return (
    <FormControl onChange={onChange} variant="outlined" size="small">
      <span> {label} </span>
      <Field
        style={{ marginBottom: "1.5rem" }}
        as={OutlinedInput}
        value={value}
        type="input"
        name={name}
      />
    </FormControl>
  );
}
