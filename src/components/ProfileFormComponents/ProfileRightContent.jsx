import React, { memo } from "react";
import { Formik, Field } from "formik";

import SubmitButton from "../SubmitButton";
import GenderRadio from "../GenderRadio.jsx";
import BackButton from "../BackButton";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

import Grid from "@material-ui/core/Grid";

const ProfileRightContent = ({ saveChangeToRedux, address, gender, email }) => {
  return (
    <div>
      <Formik
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
            <Field component={InputField} required name="email" label="Email" />
            {errors.email && touched.email && (
              <InputError value={errors.email} />
            )}
            <Field
              component={InputField}
              required
              name="address"
              label="Address"
            />
            {errors.address && touched.adddress && (
              <InputError value={errors.address} />
            )}
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
