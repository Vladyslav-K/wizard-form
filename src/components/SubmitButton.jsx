import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

export const SubmitButton = memo(({ finish, save }) => {
  const classes = useStyles({ finish });

  return (
    <div className={classes.buttonContainer}>
      <button className={classes.button} type="submit">
        {finish ? "Finish" : save ? "Save" : "Forward"}
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
    background: props => (props.finish ? "#4EE4A5" : "#4E86E4"),

    minWidth: "104px",
    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  }
}));
