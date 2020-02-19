import React, { memo } from "react";
import { Formik, Field } from "formik";

import { compareValuesAndCheckForEmptiness } from "../../../utils/helpers.js";

import { AccountFormValidationSchema } from "../../../utils/validations";
import InputPasswordField from "../../../components/InputPasswordField";
import SubmitButton from "../../../components/SubmitButton";
import InputAvatar from "../../../components/InputAvatar";

import InputField from "../../../components/InputField";
import StyledForm from "../../../components/StyledForm";

import Grid from "@material-ui/core/Grid";

const AccountForm = ({
  saveChangeToRedux,
  toggleVisibility,
  handleSubmit,
  visible,

  userData
}) => {
  const { passwordConfirmation, password, username, avatar } = userData;

  return (
    <Formik
      validationSchema={AccountFormValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={{
        passwordConfirmation,
        password,
        username,
        avatar
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          {saveChangeToRedux(values)}

          <Grid item xs={3}>
            <Field
              component={InputAvatar}
              errors={errors.avatar}
              name="avatar"
            />
          </Grid>

          <Grid item xs={5}>
            <StyledForm>
              <Field
                errors={errors.username}
                component={InputField}
                label="User name"
                name="username"
                required
              />

              <Field
                toggleVisibility={toggleVisibility}
                component={InputPasswordField}
                errors={errors.password}
                visible={visible}
                name="password"
                required
              />

              <Field
                errors={errors.passwordConfirmation}
                toggleVisibility={toggleVisibility}
                component={InputPasswordField}
                name="passwordConfirmation"
                passwordConfirmation
                visible={visible}
                required
              />

              <SubmitButton />
            </StyledForm>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default memo(AccountForm);
