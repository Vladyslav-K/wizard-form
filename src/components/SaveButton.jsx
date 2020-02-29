import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const SaveButton = memo(({ handleMessageClose, open }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.buttonContainer}>
        <button className={classes.button} type="submit">
          Save
        </button>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={handleMessageClose}
        autoHideDuration={3000}
        open={open}>
        <Alert onClose={handleMessageClose} severity="success">
          Data saved!
        </Alert>
      </Snackbar>
    </>
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
    background: props => (props.finish ? "#4EE4A5" : "#4E86E4"),

    minWidth: "104px",
    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  }
}));
