import React, { memo } from "react";
import { Formik, Field } from "formik";

import DatePicker from "../DatePicker";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

const ProfileLeftContent = ({
  saveChangeToRedux,
  firstName,
  birthDate,
  lastName
}) => {
  return (
    <div>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={{
          birthDate,
          firstName,
          lastName
        }}
      >
        {({ values, errors, touched }) => (
          <StyledForm>
            {saveChangeToRedux(values)}

            <Field
              errors={errors.firstName}
              component={InputField}
              label="First name"
              name="firstName"
              required
            />

            <Field
              errors={errors.lastName}
              component={InputField}
              label="Last name"
              name="lastName"
              required
            />

            <Field component={DatePicker} name="birthDate" />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(ProfileLeftContent);
