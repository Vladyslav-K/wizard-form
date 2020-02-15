import React, { memo } from "react";
import { Formik, Field } from "formik";

import SubmitButton from "../SubmitButton";
import GenderRadio from "../GenderRadio.jsx";
import BackButton from "../BackButton";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

import Grid from "@material-ui/core/Grid";

const ProfileRightContent = ({ saveChangeToRedux, address, gender, email }) => {
  return (
    <div>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={{
          address,
          gender,
          email
        }}
      >
        {({ values, errors, touched }) => (
          <StyledForm>
            {saveChangeToRedux(values)}
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
              required
              name="address"
              label="Address"
            />

            <Field component={GenderRadio} name="gender" />

            <Grid container justify="space-between">
              <BackButton />
              <SubmitButton />
            </Grid>
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(ProfileRightContent);
