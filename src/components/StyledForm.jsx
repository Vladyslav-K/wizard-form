import React from "react";

import { Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",

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

const StyledForm = ({ children }) => {
  const classes = useStyles();

  return <Form className={classes.formContainer}>{children}</Form>;
};

export default StyledForm;
