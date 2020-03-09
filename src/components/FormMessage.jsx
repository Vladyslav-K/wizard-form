import React, { memo } from "react";

// close icon
import { ReactComponent as CloseIcon } from "../images/icons/Close.svg";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button } from "@material-ui/core";

export const FormMessage = memo(
  ({ syncTemporaryUserDataWithDB, deleteTemporaryUser }) => {
    const classes = useStyles();

    return (
      <div className={classes.queryContainer}>
        <div>
          <span className={classes.queryText}>
            You have an unsaved user data. Do you want to complete it?
          </span>
          <Button
            className={classes.queryButton}
            onClick={syncTemporaryUserDataWithDB}>
            Continue
          </Button>
        </div>

        <IconButton onClick={deleteTemporaryUser}>
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
      lineHeight: "16px",
      fontSize: "14px",
      color: "white"
    }
  },

  queryText: {
    fontWeight: 500
  },

  queryButton: {
    padding: "0 10px",
    fontWeight: 900
  }
}));
