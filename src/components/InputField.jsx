import React, { memo } from "react";

import { InputError } from "./InputError";

import { makeStyles } from "@material-ui/core/styles";
import { OutlinedInput, FormControl, Grid } from "@material-ui/core";

export const InputField = memo(
  ({ placeholder, multiline, required, errors, label, field, form, rows }) => {
    const classes = useStyles();

    return (
      <>
        <FormControl variant="outlined" margin="normal" size="small">
          <Grid container justify="space-between">
            <label htmlFor={field.name}> {label} </label>
            {required && <label> * </label>}
          </Grid>

          <OutlinedInput
            id={field.name}
            onChange={event =>
              form.setFieldValue(field.name, event.target.value)
            }
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
  }
);

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));
