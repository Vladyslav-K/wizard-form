import React, { memo } from "react";

import { ReactComponent as VisibilityOff } from "../images/icons/icon-visibility-off.svg";
import { ReactComponent as Visibility } from "../images/icons/icon-visibility.svg";
import { InputError } from "./InputError";

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
          size="small">
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
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));
