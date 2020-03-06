import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const SaveButton = memo(({ handleMessageClose, open, errors }) => {
  const classes = useStyles();

  const noErrors = () => Object.keys(errors).length === 0;

  return (
    <>
      <div className={classes.buttonContainer}>
        <button className={classes.button} type="submit">
          Save
        </button>
      </div>

      {noErrors && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          onClose={handleMessageClose}
          autoHideDuration={1500}
          open={open}>
          <Alert onClose={handleMessageClose} severity="success">
            Data saved!
          </Alert>
        </Snackbar>
      )}
    </>
  );
});

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: "10vh"
  },

  button: {
    textTransform: "none",
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px",

    color: "white",
    background: "#4E86E4",

    minWidth: "104px",
    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  }
}));
