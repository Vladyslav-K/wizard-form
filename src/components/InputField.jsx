import React, { memo } from "react";

import { InputError } from "./InputError";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { OutlinedInput, FormControl, Grid } from "@material-ui/core";

export const InputField = memo(
  ({
    placeholder,
    multiline,
    required,
    errors,
    label,
    field,
    rows,
    handleChange,
    handleBlur
  }) => {
    const classes = useStyles();

    return (
      <>
        <FormControl variant="outlined" margin="normal" size="small">
          <Grid container justify="space-between">
            <label htmlFor={field.name}> {label} </label>

            {required && <label> * </label>}
          </Grid>

          <OutlinedInput
            className={classes.fieldStyles}
            placeholder={placeholder}
            multiline={multiline}
            value={field.value}
            id={field.name}
            type="input"
            rows={rows}
            onBlur={event => handleBlur({ [field.name]: event.target.value })}
            onChange={handleChange}
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
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px"
  }
}));
