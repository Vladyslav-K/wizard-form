import React, { memo } from "react";

import InputError from "./InputError";

import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";


const InputField = ({
  placeholder,
  multiline,
  required,
  errors,
  label,
  field,
  form,
  rows
}) => {
  const classes = useStyles();

  return (
    <>
      <FormControl variant="outlined" margin="normal" size="small">
        <Grid container justify="space-between">
          <span> {label} </span>
          {required && <span> * </span>}
        </Grid>

        <OutlinedInput
          onChange={event => form.setFieldValue(field.name, event.target.value)}
          className={classes.fieldStyles}
          placeholder={placeholder}
          multiline={multiline}
          value={field.value}
          type="input"
          rows={rows}
        />
      </FormControl>

      {errors && <InputError value={errors} />}
    </>
  );
};

export default memo(InputField);

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));