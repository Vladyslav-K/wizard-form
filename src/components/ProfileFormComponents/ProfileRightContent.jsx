import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";

import { setProfileData } from "../../domain/actions";

import SubmitButton from "../SubmitButton";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";

const ProfileRightContent = ({ profileData, setProfileData }) => {
  const { email, address, gender } = profileData;

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
              onChange={event => setProfileData({ email: event.target.value })}
            />

            {errors.email && touched.email && (
              <InputError value={errors.email} />
            )}

            <InputField
              required
              name="address"
              label="Address"
              value={address}
              onChange={event =>
                setProfileData({ address: event.target.value })
              }
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
                onChange={event =>
                  setProfileData({ gender: event.target.value })
                }
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

            <SubmitButton />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = ({ profileData }) => {
  return { profileData };
};

export default connect(mapStateToProps, { setProfileData })(
  ProfileRightContent
);
