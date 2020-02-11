import React, { memo } from "react";
import { Field } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));

const InputField = ({
  name,
  label,
  value,
  onChange,
  required,
  placeholder
}) => {
  const classes = useStyles();

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

      <Field
        className={classes.fieldStyles}
        placeholder={placeholder}
        as={OutlinedInput}
        value={value}
        type="input"
        name={name}
      />
    </FormControl>
  );
};

export default memo(InputField);
