import React, { memo } from "react";

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

const InputField = ({ placeholder, required, label, field, form }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" margin="normal" size="small">
      <Grid container justify="space-between">
        <span> {label} </span>
        {required && <span> * </span>}
      </Grid>

      <OutlinedInput
        onChange={event => form.setFieldValue(field.name, event.target.value)}
        className={classes.fieldStyles}
        placeholder={placeholder}
        value={field.value}
        type="input"
      />
    </FormControl>
  );
};

export default memo(InputField);
