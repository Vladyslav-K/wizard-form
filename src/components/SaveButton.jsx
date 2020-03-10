import React, { memo } from "react";

// styles
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

export const SaveButton = memo(
  ({ handleMessageClose, openSnackbar, errors }) => {
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
            open={openSnackbar}>
            <Alert
              onClose={handleMessageClose}
              severity="success"
              variant="filled"
              elevation={6}>
              Data saved!
            </Alert>
          </Snackbar>
        )}
      </>
    );
  }
);

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

    background: "#4E86E4",
    color: "white",

    padding: "12px 24px",
    minWidth: "104px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  }
}));
