import React, { memo } from "react";
import { Field } from "formik";
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
    display: "inline-flex",
    font: "inherit",
    color: "currentColor",
    width: "100%",
    borderRadius: "4px",
    height: "1.1875em",
    margin: 0,
    padding: "9px 0px",
    boxSizing: "content-box",
    border: "1px solid lightgrey"
  }
}));

const InputPhone = ({ phone, setPhone, name, id, labelName, required }) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      margin="normal"
      size="small"
      fullWidth
      value={phone[id]}
    >
      <Grid container justify="space-between">
        <span> {labelName} </span>
        {required && <span> * </span>}
      </Grid>

      <Field
        className={classes.fieldStyles}
        mask="+7 (999) 999-99-99"
        alwaysShowMask={false}
        as={ReactInputMask}
        maskChar="X"
        name={name}
        type="input"
        onChange={event => setPhone({ id, value: event.target.value })}
      />
    </FormControl>
  );
};

export default memo(InputPhone);
