import React, { memo } from "react";
import { Formik } from "formik";

import DatePicker from "../DatePicker";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

const ProfileLeftContent = ({
  firstName,
  birthDate,
  lastName,
  setFirstName,
  setBirthDate,
  setLastName
}) => {
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          firstName,
          lastName,
          birthDate
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <InputField
              required
              name="firstName"
              label="First name"
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />

            {errors.firstName && touched.firstName && (
              <InputError value={errors.firstName} />
            )}

            <InputField
              required
              name="lastName"
              label="Last name"
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />

            {errors.lastName && touched.lastName && (
              <InputError value={errors.lastName} />
            )}
          </StyledForm>
        )}
      </Formik>

      <DatePicker birthDate={birthDate} setBirthDate={setBirthDate} />
    </div>
  );
};

export default memo(ProfileLeftContent);
