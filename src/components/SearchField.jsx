import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { OutlinedInput, FormControl } from "@material-ui/core";

export const SearchField = memo(({ handleChange, value }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" margin="normal" size="small">
      <OutlinedInput
        value={value}
        onChange={handleChange}
        className={classes.fieldStyles}
        placeholder="Search by first or last name..."
        type="input"
      />
    </FormControl>
  );
});

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px",

    "& input": {
      border: "2px solid rgba(78, 134, 228, .4)"
    },

    "& input:focus": {
      border: "2px solid rgba(78, 134, 228, 1)"
    },

    "& fieldset": {
      border: "none"
    }
  }
}));