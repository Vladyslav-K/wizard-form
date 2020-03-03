import React, { memo } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";

export const PageNotFound = memo(() => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <Grid container direction="column" justify="space-around">
        <Grid container direction="column" justify="center" item>
          <span className={classes.errorSpan}>404</span>

          <span>Page not found</span>
        </Grid>
        <Grid container direction="column" justify="center" item>
          <span> Maybe you want to create a new user? </span>

          <div className={classes.buttonContainer}>
            <Link to="/registration">
              <button className={classes.button} type="submit">
                Create new user
              </button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
});

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: "10%",

    color: "#475666",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "20px",
    textAlign: "center",
    fontStyle: "normal",
    fontFamily: "Roboto",

    "& div": {
      margin: "20px 0"
    }
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center"
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

    width: "200px",
    height: "50px",

    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  },

  errorSpan: {
    color: "red",
    fontSize: "50px",
    marginBottom: "16px"
  }
}));
