import React, { memo } from "react";
import { Formik, Field } from "formik";

import DatePicker from "../DatePicker";
import InputError from "../InputError";
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
              component={InputField}
              label="First name"
              name="firstName"
              required
            />

            {errors.firstName && touched.firstName && (
              <InputError value={errors.firstName} />
            )}

            <Field
              component={InputField}
              label="Last name"
              name="lastName"
              required
            />

            {errors.lastName && touched.lastName && (
              <InputError value={errors.lastName} />
            )}

            <Field component={DatePicker} name="birthDate" />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(ProfileLeftContent);
