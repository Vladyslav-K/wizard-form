import React, { memo } from "react";
import { Formik, Field } from "formik";

// form validations
import { accountFormValidationSchema } from "../../utils/validations";

// components
import { InputPasswordField } from "../../components/InputPasswordField";
import { InputAvatar } from "../../components/InputAvatar";
import { InputField } from "../../components/InputField";
import { StyledForm } from "../../components/StyledForm";

// styles
import { Grid } from "@material-ui/core";

const AccountForm = ({
  initialData,
  visible,

  toggleVisibility,
  handleSubmit,
  saveUserData,
  getButtons
}) => {
  return (
    <Formik
      validationSchema={accountFormValidationSchema}
      initialValues={initialData}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      onSubmit={handleSubmit}>
      {({ errors, handleChange }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          <Grid item xs={3}>
            <Field
              component={InputAvatar}
              errors={errors.avatar}
              name="avatar"
              saveUserData={saveUserData}
            />
          </Grid>

          <Grid item xs={5}>
            <StyledForm>
              <Field
                placeholder="Enter user name"
                errors={errors.username}
                component={InputField}
                label="User name"
                name="username"
                required
                handleChange={handleChange}
                saveUserData={saveUserData}
              />

              <Field
                toggleVisibility={toggleVisibility}
                placeholder="Enter your password"
                component={InputPasswordField}
                errors={errors.password}
                visible={visible}
                name="password"
                required
                handleChange={handleChange}
                saveUserData={saveUserData}
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
                handleChange={handleChange}
                saveUserData={saveUserData}
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
