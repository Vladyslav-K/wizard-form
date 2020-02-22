import React, { memo } from "react";
import { createHashHistory } from "history";

import { makeStyles } from "@material-ui/core/styles";

const history = createHashHistory();

export const BackButton = memo(() => {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <button className={classes.button} type="button" onClick={history.goBack}>
        Back
      </button>
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: "20vh"
  },

  button: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    textTransform: "none",

    color: "white",
    background: "#C1CFE0",

    minWidth: "104px",
    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  }
}));
