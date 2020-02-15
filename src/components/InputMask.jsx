import React, { memo } from "react";
import ReactInputMask from "react-input-mask";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",

    cursor: "text",
    height: "1.1875em",

    margin: 0,
    padding: "9px 0px",
    borderRadius: "4px",
    border: "1px solid lightgrey"
  }
}));

const InputMask = ({ field, form, label, required }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" margin="normal" size="small" fullWidth>
      <Grid container justify="space-between">
        <span> {label} </span>
        {required && <span> * </span>}
      </Grid>

      <ReactInputMask
        onChange={event => form.setFieldValue(field.name, event.target.value)}
        className={classes.fieldStyles}
        mask="+7 (999) 999-99-99"
        alwaysShowMask={false}
        value={field.value}
        maskChar="X"
        type="input"
      />
    </FormControl>
  );
};

export default memo(InputMask);
