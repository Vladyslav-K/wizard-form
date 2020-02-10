import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";

import { setAccountData } from "../../domain/actions";

import { loginAndPasswordValidationSchema } from "../../utils/validations";
import InputPasswordField from "../InputPasswordField";
import SubmitButton from "../SubmitButton";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

const AccountRightContent = ({ accountData, setAccountData }) => {
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
        {({ errors, touched }) => (
          <StyledForm>
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
              passwordConfirmation
              toggleVisibility={toggleVisibility}
              value={accountData.passwordConfirmation}
              onChange={event =>
                setAccountData({ passwordConfirmation: event.target.value })
              }
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

const mapStateToProps = ({ accountData }) => {
  return { accountData };
};

export default connect(mapStateToProps, { setAccountData })(AccountRightContent);
