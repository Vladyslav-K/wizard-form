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
      fontSize: "14px",
      lineHeight: "16px",
      color: "#657C9A",

      marginBottom: "8px"
    },

    "& span": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "16px",
      color: "#657C9A"
    }
  }
}));
