import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";

import { setProfileData } from "../../domain/actions";

import DatePicker from "../DatePicker";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

const ProfileLeftContent = ({ profileData, setProfileData }) => {
  const { firstName, lastName, birthDate } = profileData;
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
              onChange={event =>
                setProfileData({ firstName: event.target.value })
              }
            />

            {errors.firstName && touched.firstName && (
              <InputError value={errors.firstName} />
            )}

            <InputField
              required
              name="lastName"
              label="Last name"
              value={profileData.lastName}
              onChange={event =>
                setProfileData({ lastName: event.target.value })
              }
            />

            {errors.lastName && touched.lastName && (
              <InputError value={errors.lastName} />
            )}
          </StyledForm>
        )}
      </Formik>

      <DatePicker birthDate={birthDate} setProfileData={setProfileData} />
    </div>
  );
};

const mapStateToProps = ({ profileData }) => {
  return { profileData };
};

export default connect(mapStateToProps, { setProfileData })(ProfileLeftContent);
