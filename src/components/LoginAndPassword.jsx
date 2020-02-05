import React, { useState } from "react";

import { Formik, Form } from "formik";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import InputPasswordField from "./InputPasswordField";
import InputField from "./InputField";

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
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: "15vh"
  },

  button: {
    color: "white",
    background: "#4E86E4",

    "&:hover": {
      backgroundColor: "#4E86E4",
      opacity: 0.9
    }
  }
}));

const validationSchema = yup.object({
  userName: yup
    .string()
    .required()
    .max(10)
});

const LoginAndPassword = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        validateOnChange={true}
        initialValues={{
          userName: "",
          password: "",
          repeatPassword: ""
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <>
            <Form className={classes.formContainer}>
              <InputField label="User name" name="userName" />

              <InputPasswordField
                toggleVisibility={toggleVisibility}
                visible={visible}
              />

              <InputPasswordField
                toggleVisibility={toggleVisibility}
                repeatPassword={true}
                visible={visible}
              />
            </Form>

            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                disabled={isSubmitting}
                variant="contained"
                type="submit"
                size="large"
              >
                Forward
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginAndPassword;
