import React, { memo } from "react";
import { Formik, Field } from "formik";

import { loginAndPasswordValidationSchema } from "../../utils/validations";
import InputPasswordField from "../InputPasswordField";
import SubmitButton from "../SubmitButton";
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
        validateOnChange={false}
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

            <Field
              errors={errors.username}
              component={InputField}
              label="User name"
              name="username"
            />

            <Field
              toggleVisibility={toggleVisibility}
              component={InputPasswordField}
              errors={errors.password}
              visible={visible}
              name="password"
            />

            <Field
              errors={errors.passwordConfirmation}
              toggleVisibility={toggleVisibility}
              component={InputPasswordField}
              name="passwordConfirmation"
              passwordConfirmation
              visible={visible}
            />

            <SubmitButton />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(AccountRightContent);
