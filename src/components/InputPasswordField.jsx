import React, { memo } from "react";

// eye icons to view/hide password
import { ReactComponent as VisibilityOff } from "../images/icons/icon-visibility-off.svg";
import { ReactComponent as Visibility } from "../images/icons/icon-visibility.svg";

import { InputError } from "./InputError";

// styles
import { makeStyles } from "@material-ui/core/styles";
import {
  InputAdornment,
  OutlinedInput,
  FormControl,
  IconButton,
  Grid
} from "@material-ui/core";

export const InputPasswordField = memo(
  ({
    passwordConfirmation,
    toggleVisibility,
    placeholder,
    required,
    visible,
    errors,
    field,
    handleChange,
    saveUser
  }) => {
    const classes = useStyles();

    const handleButtonMouseDown = event => {
      event.preventDefault();
    };

    return (
      <>
        <FormControl variant="outlined" margin="normal" size="small">
          <Grid container justify="space-between">
            <label htmlFor={field.name}>
              {passwordConfirmation ? "Repeat Password" : "Password"}
            </label>
            {required && <label> * </label>}
          </Grid>

          <OutlinedInput
            id={field.name}
            name={passwordConfirmation ? "passwordConfirmation" : "password"}
            type={visible ? "text" : "password"}
            className={classes.fieldStyles}
            placeholder={placeholder}
            value={field.value}
            onBlur={event => saveUser({ [field.name]: event.target.value })}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={handleButtonMouseDown}
                  onClick={toggleVisibility}>
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
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
