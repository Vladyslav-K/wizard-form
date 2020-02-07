import React from "react";

import { Field } from "formik";

import { ReactComponent as VisibilityOff } from "../images/icons/icon-visibility-off.svg";
import { ReactComponent as Visibility } from "../images/icons/icon-visibility.svg";

import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";

export default function InputPasswordField({
  passwordConfirmation,
  toggleVisibility,
  onChange,
  visible,
  value
}) {
  const handleButtonMouseDown = event => {
    event.preventDefault();
  };

  return (
    <FormControl onChange={onChange} variant="outlined" size="small">
      <span> {passwordConfirmation ? "Repeat Password" : "Password"} </span>

      <Field
        name={passwordConfirmation ? "passwordConfirmation" : "password"}
        type={visible ? "text" : "password"}
        id="standard-adornment-password"
        style={{ marginBottom: "1.5rem" }}
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
}
