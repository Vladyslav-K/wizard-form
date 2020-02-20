import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import { compareValuesAndCheckForEmptiness } from "../../../utils/helpers.js";
import { skillsList, hobbiesList } from "../../../utils/dictionaries.js";

import Grid from "@material-ui/core/Grid";

import InputAutocomplete from "../../../components/InputAutocomplete";
import SubmitButton from "../../../components/SubmitButton";
import StyledForm from "../../../components/StyledForm";
import BackButton from "../../../components/BackButton";
import InputField from "../../../components/InputField";
import CheckBox from "../../../components/CheckBox";

const CapabilitiesForm = ({
  saveChangeToRedux,
  temporaryUserData,
  handleSubmit
}) => {
  const { additionalInformation, hobbies, skills } = temporaryUserData;

  const capabilitiesData = { additionalInformation, hobbies, skills };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={{
        additionalInformation: temporaryUserData.additionalInformation,
        hobbies: temporaryUserData.hobbies,
        skills: temporaryUserData.skills
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          {compareValuesAndCheckForEmptiness(values, capabilitiesData) &&
            saveChangeToRedux(values)}

          <Grid item xs={4}>
            <StyledForm>
              <Field
                component={InputAutocomplete}
                options={skillsList}
                label="Skills"
                name="skills"
                multiple
                required
              />

              <Field
                label="Additional information"
                name="additionalInformation"
                component={InputField}
                multiline
                rows={5}
              />
            </StyledForm>
          </Grid>

          <Grid item xs={4}>
            <StyledForm>
              <FieldArray
                name="hobbies"
                render={() => (
                  <Field
                    options={hobbiesList}
                    component={CheckBox}
                    label={"My hobbies"}
                    fieldName="hobbies"
                    name="hobbies"
                  />
                )}
              />

              <Grid container justify="space-between">
                <BackButton />
                <SubmitButton />
              </Grid>
            </StyledForm>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default memo(CapabilitiesForm);
