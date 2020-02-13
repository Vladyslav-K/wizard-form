import React, { memo } from "react";
import { Formik } from "formik";

import SubmitButton from "../SubmitButton";
import BackButton from "../BackButton";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const ProfileRightContent = ({
  address,
  gender,
  email,
  setAddress,
  setGender,
  setEmail
}) => {
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
          address,
          gender
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <InputField
              required
              name="email"
              label="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            {errors.email && touched.email && (
              <InputError value={errors.email} />
            )}

            <InputField
              required
              name="address"
              label="Address"
              value={address}
              onChange={event => setAddress(event.target.value)}
            />

            {errors.address && touched.adddress && (
              <InputError value={errors.address} />
            )}

            <FormControl component="fieldset" style={{ marginTop: "22px" }}>
              <span>Gender</span>
              <RadioGroup
                aria-label="position"
                name="position"
                value={gender}
                onChange={event => setGender(event.target.value)}
                row
              >
                <Grid
                  container
                  justify="space-between"
                  style={{ width: "70%" }}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio color="primary" />}
                    label="Male"
                    labelPlacement="end"
                  />

                  <FormControlLabel
                    value="Female"
                    control={<Radio color="primary" />}
                    label="Female"
                    labelPlacement="end"
                  />
                </Grid>
              </RadioGroup>
            </FormControl>
          </StyledForm>
        )}
      </Formik>
      <Grid container justify="space-between">
        <BackButton />
        <SubmitButton />
      </Grid>
    </div>
  );
};

export default memo(ProfileRightContent);
