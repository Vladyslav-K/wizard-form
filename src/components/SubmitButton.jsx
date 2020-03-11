import React, { memo } from "react";

import { makeStyles } from "@material-ui/core/styles";

export const SubmitButton = memo(({ finish, save }) => {
  const classes = useStyles({ finish, save });

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

    marginTop: "10vh"
  },

  button: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px",

    textTransform: "none",

    color: "white",

    background: props => (props.finish ? "#4EE4A5" : "#4E86E4"),

    padding: "12px 24px",
    minWidth: "104px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  }
}));
