import React, { memo } from "react";

import { ReactComponent as CloseIcon } from "../images/icons/Close.svg";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button } from "@material-ui/core";

export const FormMessage = memo(
  ({ getTemporaryUserDataWithDatabase, removeTemporaryUserData }) => {
    const classes = useStyles();

    return (
      <div className={classes.queryContainer}>
        <div>
          <span className={classes.queryText}>
            You have an unsaved user data. Do you want to complete it?
          </span>
          <Button
            className={classes.queryButton}
            onClick={getTemporaryUserDataWithDatabase}>
            Continue
          </Button>
        </div>

        <IconButton onClick={removeTemporaryUserData}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  }
);

const useStyles = makeStyles(theme => ({
  queryContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "10px 24px",

    background: "#5E97F3",

    "& span": {
      textTransform: "none",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "16px",
      color: "white"
    }
  },

  queryText: {
    fontWeight: 500
  },

  queryButton: {
    fontWeight: 900,

    padding: "0 10px"
  }
}));
