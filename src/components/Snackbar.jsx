import React, { memo } from "react";

// styles
import Alert from "@material-ui/lab/Alert";
import { Snackbar as MuiSnackbar } from "@material-ui/core";

export const Snackbar = memo(({ handleMessageClose, openSnackbar, errors }) => {
  const noErrors = () => Object.keys(errors).length === 0;

  return (
    noErrors && (
      <MuiSnackbar
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
      </MuiSnackbar>
    )
  );
});
