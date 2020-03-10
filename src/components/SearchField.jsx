import React, { memo } from "react";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { OutlinedInput, FormControl } from "@material-ui/core";

export const SearchField = memo(({ handleChange, value }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" margin="normal" size="small">
      <OutlinedInput
        placeholder="Search by first or last name..."
        className={classes.fieldStyles}
        onChange={handleChange}
        value={value}
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
      border: "2px solid rgba(78, 134, 228, .3)"
    },

    "& input:hover": {
      border: "2px solid rgba(78, 134, 228, .5)"
    },

    "& input:focus": {
      border: "2px solid rgba(78, 134, 228, 1)"
    },

    "& fieldset": {
      border: "none"
    }
  }
}));
