import React, { memo } from "react";
import { Formik } from "formik";

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
  setPasswordConfirmation,
  setPassword,
  setUserName,
  visible,
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
        {({ errors }) => (
          <StyledForm>
            <InputField
              name="username"
              label="User name"
              value={username}
              onChange={event => setUserName(event.target.value)}
            />

            {errors.username && <InputError value={errors.username} />}

            <InputPasswordField
              visible={visible}
              value={password}
              toggleVisibility={toggleVisibility}
              onChange={event => setPassword(event.target.value)}
            />

            {errors.password && <InputError value={errors.password} />}

            <InputPasswordField
              visible={visible}
              passwordConfirmation
              toggleVisibility={toggleVisibility}
              value={passwordConfirmation}
              onChange={event => setPasswordConfirmation(event.target.value)}
            />

            {errors.passwordConfirmation && (
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
