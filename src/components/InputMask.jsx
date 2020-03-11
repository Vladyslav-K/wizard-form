import React, { memo } from "react";
import ReactInputMask from "react-input-mask";

import { InputError } from "./InputError";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Grid } from "@material-ui/core";

export const InputMask = memo(
  ({
    placeholder,
    phonesInput,
    required,
    errors,
    label,
    field,
    index,
    form,
    handleChange,
    saveUser,
    onClick
  }) => {
    const classes = useStyles();

    return (
      <Grid container direction="column" className={classes.mainContainer}>
        <FormControl variant="outlined" margin="normal" size="small">
          <Grid
            container
            justify="space-between"
            className={classes.labelContainer}>
            <label htmlFor={field.name}> {label} </label>

            {required && <label> * </label>}
          </Grid>

          <ReactInputMask
            className={classes.fieldStyles}
            mask="+7 (999) 999-99-99"
            placeholder={placeholder}
            alwaysShowMask={false}
            value={field.value}
            id={field.name}
            maskChar="X"
            type="input"
            onBlur={event => saveUser({ [field.name]: event.target.value })}
            onChange={handleChange}
          />
        </FormControl>

        {errors && <InputError value={errors} />}
      </Grid>
    );
  }
);

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: "120%"
  },

  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px",

    height: "1.1875em",
    cursor: "text",

    width: "80%",

    border: "1px solid lightgrey",
    borderRadius: "4px",
    padding: "9px 6px",
    margin: 0
  },

  labelContainer: {
    width: "85%"
  },

  minusButtonStyles: {
    maxWidth: "15%",
    minWidth: 0
  }
}));
