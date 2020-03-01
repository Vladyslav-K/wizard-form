import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Grid } from "@material-ui/core";

import { InputError } from "./InputError";

export const InputAutocomplete = memo(
  ({
    placeholder,
    required,
    multiple,
    options,
    field,
    label,
    form,
    errors
  }) => {
    const classes = useStyles();

    return (
      <Autocomplete
        getOptionLabel={options => options}
        value={field.value}
        multiple={multiple}
        options={options}
        size="small"
        onChange={(event, value) => form.setFieldValue(field.name, value)}
        renderInput={params => (
          <Grid container className={classes.fieldContainer}>
            <Grid container justify="space-between">
              <label htmlFor={field.name}> {label} </label>
              {required && <label> * </label>}
            </Grid>

            <TextField
              className={classes.fieldStyles}
              placeholder={placeholder}
              variant="outlined"
              name={field.name}
              id={field.name}
              {...params}
              fullWidth
            />

            {errors && <InputError value={errors} />}
          </Grid>
        )}
      />
    );
  }
);

const useStyles = makeStyles(theme => ({
  fieldContainer: {
    marginTop: "16px",
    marginBottom: "3rem"
  },

  fieldStyles: {
    marginBottom: "8px",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));
