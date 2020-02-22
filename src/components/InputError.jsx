import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";

export const InputError = memo(({ value }) => {
  const classes = useStyles();
  return <div className={classes.inputError}>{value}</div>;
});

const useStyles = makeStyles(theme => ({
  inputError: {
    color: "red"
  }
}));
