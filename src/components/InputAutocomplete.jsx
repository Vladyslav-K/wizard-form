import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Grid } from "@material-ui/core";

export const InputAutocomplete = memo(
  ({ required, multiple, options, field, label, form }) => {
    const classes = useStyles();

    return (
      <Autocomplete
        onInputChange={(event, value) =>
          !multiple && form.setFieldValue(field.name, value)
        }
        onChange={(event, value) => form.setFieldValue(field.name, value)}
        value={field.value}
        multiple={multiple}
        options={options}
        disableClearable
        size="small"
        freeSolo
        renderInput={params => (
          <Grid container className={classes.fieldContainer}>
            <Grid container justify="space-between">
              <span> {label} </span>
              {required && <span> * </span>}
            </Grid>

            <TextField
              className={classes.fieldStyles}
              variant="outlined"
              {...params}
              fullWidth
            />
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
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));
