import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { OutlinedInput, FormControl } from "@material-ui/core";

export const SearchField = memo(({ handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" margin="normal" size="small">
      <OutlinedInput
        onChange={handleChange}
        className={classes.fieldStyles}
        placeholder="Search by name..."
        type="input"
      />
    </FormControl>
  );
});

const useStyles = makeStyles(theme => ({
  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",

    border: "2px solid #4E86E4",

    "& fieldset": {
      border: "none"
    }
  }
}));
