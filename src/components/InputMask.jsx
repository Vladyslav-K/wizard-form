import React, { memo } from "react";
import ReactInputMask from "react-input-mask";

// minus icon
import { ReactComponent as MinusIcon } from "../images/icons/minus.svg";

import { InputError } from "./InputError";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Grid, Button } from "@material-ui/core";

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
    saveUserData,
    handleChange,
    onClick
  }) => {
    const classes = useStyles();

    const completedPhoneNumber = number => {
      return number && !number.includes("X");
    };

    const onBlur = event => {
      const number = event.target.value;

      if (completedPhoneNumber(number)) {
        phonesInput
          ? saveUserData({ phones: form.values.phones })
          : saveUserData({ [field.name]: number });
      }
    };

    return (
      <Grid container direction="column">
        <FormControl variant="outlined" margin="normal" size="small">
          <Grid
            container
            justify="space-between"
            className={classes.labelContainer}>
            <label htmlFor={field.name}> {label} </label>

            {required && <label> * </label>}
          </Grid>

          <Grid container direction="row">
            <ReactInputMask
              className={classes.fieldStyles}
              mask="+7 (999) 999-99-99"
              placeholder={placeholder}
              alwaysShowMask={false}
              value={field.value}
              id={field.name}
              maskChar="X"
              type="input"
              onBlur={onBlur}
              onChange={handleChange}
            />

            {index > 1 && (
              <Button className={classes.minusButtonStyles} onClick={onClick}>
                <MinusIcon />
              </Button>
            )}
          </Grid>
        </FormControl>
        {errors && <InputError value={errors} />}
      </Grid>
    );
  }
);

const useStyles = makeStyles(theme => ({
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
