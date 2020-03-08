import React, { memo } from "react";
import { Formik, Field } from "formik";

// form validations
import { profileFormValidationSchema } from "../../utils/validations";

// components
import { InputGooglePlacesAutocomplete } from "../../components/InputGooglePlacesAutocomplete";
import { GenderRadio } from "../../components/GenderRadio.jsx";
import { DatePicker } from "../../components/DatePicker";
import { InputField } from "../../components/InputField";
import { StyledForm } from "../../components/StyledForm";

// styles
import { Grid } from "@material-ui/core";

const ProfileForm = ({
  initialData,
  handleSubmit,
  saveUserData,
  getButtons
}) => {
  return (
    <div>
      <Formik
        validationSchema={profileFormValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={{
          ...initialData,
          birthDate: initialData.birthDate || new Date()
        }}
        onSubmit={handleSubmit}>
        {({ values, errors, handleChange }) => (
          <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
            <Grid item xs={4}>
              <StyledForm>
                <Field
                  errors={errors.firstName}
                  placeholder="First name"
                  component={InputField}
                  label="First name"
                  name="firstName"
                  required
                  handleChange={handleChange}
                  saveUserData={saveUserData}
                />

                <Field
                  errors={errors.lastName}
                  placeholder="Last name"
                  component={InputField}
                  label="Last name"
                  name="lastName"
                  required
                  handleChange={handleChange}
                  saveUserData={saveUserData}
                />

                <Field
                  errors={errors.birthDate}
                  component={DatePicker}
                  name="birthDate"
                  saveUserData={saveUserData}
                />
              </StyledForm>
            </Grid>

            <Grid item xs={4}>
              <StyledForm>
                <Field
                  placeholder="Enter email"
                  component={InputField}
                  errors={errors.email}
                  label="Email"
                  name="email"
                  required
                  handleChange={handleChange}
                  saveUserData={saveUserData}
                />

                <Field
                  component={InputGooglePlacesAutocomplete}
                  placeholder="Enter your address"
                  errors={errors.address}
                  label="Address"
                  name="address"
                  required
                  saveUserData={saveUserData}
                />

                <Field
                  component={GenderRadio}
                  name="gender"
                  saveUserData={saveUserData}
                />

                {getButtons({ getBackButton: true, errors: { ...errors } })}
              </StyledForm>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
};

export default memo(ProfileForm);
