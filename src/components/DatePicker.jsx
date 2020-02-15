import React, { memo } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as CalendarIcon } from "../images/icons/calendar.svg";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  container: {
    "& span": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "16px",
      color: "#657C9A"
    }
  }
}));

const DatePicker = ({ field, form }) => {
  const classes = useStyles();

  const handleButtonMouseDown = event => {
    event.preventDefault();
  };

  const CustomInput = ({ onClick }) => (
    <FormControl
      className={classes.container}
      variant="outlined"
      margin="normal"
      size="small"
    >
      <Grid container justify="space-between">
        <span> Birth date </span>
        <span> * </span>
      </Grid>

      <OutlinedInput
        placeholder="DD/MM/YYYY"
        value={
          field.value &&
          new Date(field.value).toLocaleDateString().replace(/\./g, "/")
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onMouseDown={handleButtonMouseDown} onClick={onClick}>
              <CalendarIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );

  const CustomInputRef = React.forwardRef((props, ref) => (
    <CustomInput innerRef={ref} {...props} />
  ));

  return (
    <ReactDatePicker
      onChange={value => form.setFieldValue(field.name, value)}
      customInput={<CustomInputRef />}
    />
  );
};

export default memo(DatePicker);
