import React, { memo } from "react";
import { Formik, Field } from "formik";

import { compareValuesAndCheckForEmptiness } from "../../../utils/helpers.js";

import GenderRadio from "../../../components/GenderRadio.jsx";
import SubmitButton from "../../../components/SubmitButton";
import BackButton from "../../../components/BackButton";
import DatePicker from "../../../components/DatePicker";
import InputField from "../../../components/InputField";
import StyledForm from "../../../components/StyledForm";

import Grid from "@material-ui/core/Grid";

const ProfileForm = ({ saveChangeToRedux, handleSubmit, temporaryUserData }) => {
  const { firstName, birthDate, lastName, address, gender, email } = temporaryUserData;

  const profileData = {
    firstName,
    birthDate,
    lastName,
    address,
    gender,
    email
  };

  return (
    <div>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={{
          birthDate,
          firstName,
          lastName,
          address,
          gender,
          email
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
            {compareValuesAndCheckForEmptiness(values, profileData) &&
              saveChangeToRedux(values)}

            <Grid item xs={4}>
              <StyledForm>
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
            </Grid>

            <Grid item xs={4}>
              <StyledForm>
                <Field
                  component={InputField}
                  errors={errors.email}
                  label="Email"
                  name="email"
                  required
                />

                <Field
                  component={InputField}
                  errors={errors.address}
                  label="Address"
                  name="address"
                  required
                />

                <Field component={GenderRadio} name="gender" />

                <Grid container justify="space-between">
                  <BackButton />
                  <SubmitButton />
                </Grid>
              </StyledForm>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
};

export default memo(ProfileForm);