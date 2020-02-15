import React, { memo } from "react";
import { Formik, Field } from "formik";

import { loginAndPasswordValidationSchema } from "../../utils/validations";
import InputPasswordField from "../InputPasswordField";
import SubmitButton from "../SubmitButton";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

const AccountRightContent = ({
  passwordConfirmation,
  password,
  username,
  visible,
  saveChangeToRedux,
  toggleVisibility
}) => {
  return (
    <div>
      <Formik
        validationSchema={loginAndPasswordValidationSchema}
        validateOnBlur={false}
        enableReinitialize
        initialValues={{
          passwordConfirmation,
          password,
          username
        }}
      >
        {({ values, errors, touched }) => (
          <StyledForm>
            {saveChangeToRedux(values)}

            <Field component={InputField} label="User name" name="username" />

            {errors.username && touched.username && (
              <InputError value={errors.username} />
            )}

            <Field
              toggleVisibility={toggleVisibility}
              component={InputPasswordField}
              visible={visible}
              name="password"
            />

            {errors.password && touched.password && (
              <InputError value={errors.password} />
            )}

            <Field
              toggleVisibility={toggleVisibility}
              component={InputPasswordField}
              name="passwordConfirmation"
              passwordConfirmation
              visible={visible}
            />

            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <InputError value={errors.passwordConfirmation} />
            )}

            <SubmitButton />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(AccountRightContent);
