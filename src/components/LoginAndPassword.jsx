import React, { useState } from "react";
import { connect } from "react-redux";

import { setAccountData } from "../domain/actions";

import { Formik, Form } from "formik";

import { makeStyles } from "@material-ui/core/styles";

import { loginAndPasswordValidationSchema } from "../utils/validations";
import InputPasswordField from "./InputPasswordField";
import InputError from "./InputError";
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
  },

  inputError: {
    color: "red"
  }
}));

const LoginAndPassword = ({ accountData, setAccountData }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Formik
        validationSchema={loginAndPasswordValidationSchema}
        enableReinitialize
        initialValues={{
          username: accountData.username,
          password: accountData.password,
          passwordConfirmation: accountData.passwordConfirmation
        }}
        onSubmit={data => setAccountData(data)}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.formContainer}>
            <InputField
              name="username"
              label="User name"
              value={accountData.username}
              onChange={event =>
                setAccountData({ username: event.target.value })
              }
            />

            {errors.username && touched.username && (
              <InputError value={errors.username} />
            )}

            <InputPasswordField
              visible={visible}
              value={accountData.password}
              toggleVisibility={toggleVisibility}
              onChange={event =>
                setAccountData({ password: event.target.value })
              }
            />

            {errors.password && touched.password && (
              <InputError value={errors.password} />
            )}

            <InputPasswordField
              visible={visible}
              passwordConfirmation={true}
              toggleVisibility={toggleVisibility}
              value={accountData.passwordConfirmation}
              onChange={event =>
                setAccountData({ passwordConfirmation: event.target.value })
              }
            />

            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <InputError value={errors.passwordConfirmation} />
            )}

            <div className={classes.buttonContainer}>
              <button
                className={classes.button}
                disabled={isSubmitting}
                type="submit"
              >
                Forward
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = ({ accountData }) => {
  return { accountData };
};

export default connect(mapStateToProps, { setAccountData })(LoginAndPassword);
