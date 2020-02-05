import React from "react";

import { Field } from "formik";

import { ReactComponent as VisibilityOff } from "../images/icons/icon-visibility-off.svg";
import { ReactComponent as Visibility } from "../images/icons/icon-visibility.svg";

import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";

export default function InputPasswordField({
  toggleVisibility,
  repeatPassword,
  visible
}) {
  const handleButtonMouseDown = event => {
    event.preventDefault();
  };

  return (
    <FormControl margin="normal" variant="outlined" size="small">
      <span> {repeatPassword ? "Repeat Password" : "Password"} </span>

      <Field
        name={repeatPassword ? "repeatPassword" : "password"}
        type={visible ? "text" : "password"}
        id="standard-adornment-password"
        as={OutlinedInput}
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
