import React, { memo } from "react";
import { Formik, Field } from "formik";

import { accountFormValidationSchema } from "../../utils/validations";
import { InputPasswordField } from "../../components/InputPasswordField";
import { InputAvatar } from "../../components/InputAvatar";

import { InputField } from "../../components/InputField";
import { StyledForm } from "../../components/StyledForm";

import { Grid } from "@material-ui/core";

const AccountForm = ({
  saveChangeToRedux,
  toggleVisibility,
  handleSubmit,
  getButtons,
  visible,

  initialData
}) => {
  return (
    <Formik
      validationSchema={accountFormValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={initialData}
      onSubmit={handleSubmit}>
      {({ values, errors }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          {saveChangeToRedux(values, initialData)}

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
                placeholder="Enter user name"
                component={InputField}
                label="User name"
                name="username"
                required
              />

              <Field
                toggleVisibility={toggleVisibility}
                component={InputPasswordField}
                errors={errors.password}
                placeholder="Enter your password"
                visible={visible}
                name="password"
                required
              />

              <Field
                errors={errors.passwordConfirmation}
                toggleVisibility={toggleVisibility}
                placeholder={"Confirm password"}
                component={InputPasswordField}
                name="passwordConfirmation"
                passwordConfirmation
                visible={visible}
                required
              />

              {getButtons({ errors: { ...errors } })}
            </StyledForm>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default memo(AccountForm);
