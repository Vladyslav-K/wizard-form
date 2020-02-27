import React, { memo } from "react";
import ReactInputMask from "react-input-mask";

import { ReactComponent as MinusIcon } from "../images/icons/minus.svg";

import { InputError } from "./InputError";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Grid, Button } from "@material-ui/core";

export const InputMask = memo(
  ({ field, form, label, required, errors, index, onClick }) => {
    const classes = useStyles();

    return (
      <Grid container direction="column">
        <FormControl variant="outlined" margin="normal" size="small" fullWidth>
          <Grid container justify="space-between">
            <label htmlFor={field.name}> {label} </label>
            {required && <label> * </label>}
          </Grid>

          {index && index > 0 ? (
            <Grid container direction="row">
              <ReactInputMask
                id={field.name}
                onChange={event =>
                  form.setFieldValue(field.name, event.target.value)
                }
                className={classes.fieldStyles}
                mask="+7 (999) 999-99-99"
                alwaysShowMask={false}
                value={field.value}
                maskChar="X"
                type="input"
              />

              {index > 0 && (
                <Button className={classes.minusButtonStyles} onClick={onClick}>
                  <MinusIcon />
                </Button>
              )}
            </Grid>
          ) : (
            <ReactInputMask
              id={field.name}
              onChange={event =>
                form.setFieldValue(field.name, event.target.value)
              }
              className={classes.fieldStyles}
              mask="+7 (999) 999-99-99"
              alwaysShowMask={false}
              value={field.value}
              maskChar="X"
              type="input"
            />
          )}
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

    minWidth: "80%",

    margin: 0,
    padding: "9px 6px",
    borderRadius: "4px",
    border: "1px solid lightgrey"
  },

  minusButtonStyles: {
    maxWidth: "15%",
    minWidth: 0
  }
}));
