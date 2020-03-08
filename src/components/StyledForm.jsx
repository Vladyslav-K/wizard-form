import React, { memo } from "react";

import { Form } from "formik";

import { makeStyles } from "@material-ui/core/styles";

export const StyledForm = memo(({ children }) => {
  const classes = useStyles();

  return <Form className={classes.formContainer}>{children}</Form>;
});

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",

    "& label": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: "16px",
      fontSize: "14px",

      color: "#657C9A",

      marginBottom: "8px"
    },

    "& span": {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: "16px",
      fontSize: "14px",
      color: "#657C9A"
    }
  }
}));
