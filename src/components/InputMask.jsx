import React, { memo } from "react";
import ReactInputMask from "react-input-mask";

import { ReactComponent as MinusIcon } from "../images/icons/minus.svg";

import { InputError } from "./InputError";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Grid, Button } from "@material-ui/core";

export const InputMask = memo(
  ({ placeholder, field, form, label, required, errors, index, onClick }) => {
    const classes = useStyles();

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
              id={field.name}
              onChange={event =>
                form.setFieldValue(field.name, event.target.value)
              }
              className={classes.fieldStyles}
              mask="+7 (999) 999-99-99"
              placeholder={placeholder}
              alwaysShowMask={false}
              value={field.value}
              maskChar="X"
              type="input"
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
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",

    cursor: "text",
    height: "1.1875em",

    width: "80%",

    margin: 0,
    padding: "9px 6px",
    borderRadius: "4px",
    border: "1px solid lightgrey"
  },

  labelContainer: {
    width: "85%"
  },

  minusButtonStyles: {
    maxWidth: "15%",
    minWidth: 0
  }
}));
