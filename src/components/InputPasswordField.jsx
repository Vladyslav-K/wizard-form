import React, { memo } from "react";

import { Field } from "formik";

import { ReactComponent as VisibilityOff } from "../images/icons/icon-visibility-off.svg";
import { ReactComponent as Visibility } from "../images/icons/icon-visibility.svg";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));

const InputPasswordField = ({
  passwordConfirmation,
  toggleVisibility,
  onChange,
  visible,
  value
}) => {
  const classes = useStyles();

  const handleButtonMouseDown = event => {
    event.preventDefault();
  };

  return (
    <FormControl
      onChange={onChange}
      variant="outlined"
      margin="normal"
      size="small"
    >
      <span> {passwordConfirmation ? "Repeat Password" : "Password"} </span>

      <Field
        name={passwordConfirmation ? "passwordConfirmation" : "password"}
        type={visible ? "text" : "password"}
        id="standard-adornment-password"
        className={classes.fieldStyles}
        as={OutlinedInput}
        value={value}
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
  );
};

export default memo(InputPasswordField);
