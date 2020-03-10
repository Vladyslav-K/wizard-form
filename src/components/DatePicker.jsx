import React, { memo } from "react";
import ReactDatePicker from "react-datepicker";
import InputMask from "react-text-mask";
import "react-datepicker/dist/react-datepicker.css";

// calendar icon
import { ReactComponent as CalendarIcon } from "../images/icons/calendar.svg";

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

export const DatePicker = memo(({ field, form, errors, saveUserData }) => {
  const classes = useStyles();

  const CustomInput = ({ onClick, onChange, value }) => (
    <FormControl
      className={classes.container}
      variant="outlined"
      margin="normal"
      size="small">
      <Grid container justify="space-between">
        <span> Birth date </span>
        <span> * </span>
      </Grid>

      <OutlinedInput
        value={value}
        placeholder="DD/MM/YYYY"
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onMouseDown={event => event.preventDefault()}
              onClick={onClick}>
              <CalendarIcon />
            </IconButton>
          </InputAdornment>
        }
        inputComponent={TextMaskCustom}
      />
    </FormControl>
  );

  const CustomInputRef = React.forwardRef((props, ref) => (
    <CustomInput innerRef={ref} {...props} />
  ));

  return (
    <>
      <ReactDatePicker
        dateFormat="dd/MM/y"
        selected={field.value}
        value={field.value}
        onChange={value => {
          saveUserData({ [field.name]: value });
        }}
        customInput={<CustomInputRef />}
      />

      {errors && <InputError value={errors} />}
    </>
  );
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <InputMask
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0-9]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/
      ]}
    />
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    "& span": {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: "16px",
      fontSize: "14px",
      color: "#657C9A"
    }
  }
}));
