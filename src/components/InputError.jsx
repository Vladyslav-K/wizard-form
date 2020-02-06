import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  inputError: {
    color: "red"
  }
}));

export default function InputError({ value }) {
  const classes = useStyles();
  return <div className={classes.inputError}>{value}</div>;
}
