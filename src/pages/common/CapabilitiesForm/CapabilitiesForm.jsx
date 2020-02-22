import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

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
  capabilitiesData,
  handleSubmit
}) => {
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={capabilitiesData}
      onSubmit={handleSubmit}>
      {({ values, errors }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          {saveChangeToRedux(values, capabilitiesData)}

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
