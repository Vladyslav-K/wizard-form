import React, { memo } from "react";

import { ReactComponent as VisibilityOff } from "../images/icons/icon-visibility-off.svg";
import { ReactComponent as Visibility } from "../images/icons/icon-visibility.svg";
import InputError from "./InputError";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

const InputPasswordField = ({
  passwordConfirmation,
  toggleVisibility,
  required,
  visible,
  errors,
  field,
  form
}) => {
  const classes = useStyles();

  const handleButtonMouseDown = event => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl
        onChange={event => form.setFieldValue(field.name, event.target.value)}
        variant="outlined"
        margin="normal"
        size="small"
      >
        <Grid container justify="space-between">
          <span> {passwordConfirmation ? "Repeat Password" : "Password"} </span>
          {required && <span> * </span>}
        </Grid>

        <OutlinedInput
          name={passwordConfirmation ? "passwordConfirmation" : "password"}
          type={visible ? "text" : "password"}
          className={classes.fieldStyles}
          value={field.value}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onMouseDown={handleButtonMouseDown}
                onClick={toggleVisibility}
              >
                {visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {errors && <InputError value={errors} />}
    </>
  );
};

export default memo(InputPasswordField);

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));
