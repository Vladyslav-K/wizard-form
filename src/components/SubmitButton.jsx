import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: "15vh"
  },

  button: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    textTransform: "none",

    color: "white",
    background: "#4E86E4",

    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  }
}));

const SubmitButton = () => {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <button className={classes.button} type="submit">
        Forward
      </button>
    </div>
  );
};

export default SubmitButton;
