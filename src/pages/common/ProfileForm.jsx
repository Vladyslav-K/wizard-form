import React, { memo } from "react";
import { Formik, Field } from "formik";

import { profileFormValidationSchema } from "../../utils/validations";

import { InputGooglePlacesAutocomplete } from "../../components/InputGooglePlacesAutocomplete";
import { GenderRadio } from "../../components/GenderRadio.jsx";
import { DatePicker } from "../../components/DatePicker";
import { InputField } from "../../components/InputField";
import { StyledForm } from "../../components/StyledForm";

import { Grid } from "@material-ui/core";

export const ProfileForm = memo(
  ({ saveChangeToRedux, handleSubmit, getButtons, initialData }) => {
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
          {({ values, errors }) => (
            <Grid
              container
              justify="space-around"
              style={{ marginTop: "2rem" }}>
              {saveChangeToRedux(values, initialData)}

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

                  <Field
                    errors={errors.birthDate}
                    component={DatePicker}
                    name="birthDate"
                  />
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
                    component={InputGooglePlacesAutocomplete}
                    errors={errors.address}
                    label="Address"
                    name="address"
                    required
                  />

                  <Field component={GenderRadio} name="gender" />

                  {getButtons("getBackButton")}
                </StyledForm>
              </Grid>
            </Grid>
          )}
        </Formik>
      </div>
    );
  }
);
