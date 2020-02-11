import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  inputError: {
    color: "red"
  }
}));

const InputError = ({ value }) => {
  const classes = useStyles();
  return <div className={classes.inputError}>{value}</div>;
};

export default memo(InputError);
