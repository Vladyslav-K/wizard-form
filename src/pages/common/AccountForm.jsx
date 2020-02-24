import React, { memo } from "react";
import { Formik, Field } from "formik";

import { AccountFormValidationSchema } from "../../utils/validations";
import { InputPasswordField } from "../../components/InputPasswordField";
import { InputAvatar } from "../../components/InputAvatar";

import { InputField } from "../../components/InputField";
import { StyledForm } from "../../components/StyledForm";

import { Grid } from "@material-ui/core";

export const AccountForm = memo(
  ({
    saveChangeToRedux,
    toggleVisibility,
    handleSubmit,
    getButtons,
    visible,

    userData
  }) => {
    const { passwordConfirmation, password, username, avatar } = userData;

    const accountData = { passwordConfirmation, password, username, avatar };

    return (
      <Formik
        validationSchema={AccountFormValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={accountData}
        onSubmit={handleSubmit}>
        {({ values, errors }) => (
          <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
            {saveChangeToRedux(values, accountData)}

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

                {getButtons()}
              </StyledForm>
            </Grid>
          </Grid>
        )}
      </Formik>
    );
  }
);
