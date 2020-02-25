import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import { capabilitiesFormValidationSchema } from "../../utils/validations";

import { skillsList, hobbiesList } from "../../utils/dictionaries.js";

import { Grid } from "@material-ui/core";

import { InputAutocomplete } from "../../components/InputAutocomplete";
import { StyledForm } from "../../components/StyledForm";
import { InputField } from "../../components/InputField";
import { CheckBox } from "../../components/CheckBox";

export const CapabilitiesForm = memo(
  ({ saveChangeToRedux, userData, handleSubmit, getButtons }) => {
    const { additionalInformation, hobbies, skills } = userData;

    const capabilitiesData = { additionalInformation, hobbies, skills };

    return (
      <Formik
        validationSchema={capabilitiesFormValidationSchema}
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
                  errors={errors.skills}
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

                {getButtons("getBackButton", "getFinishButton")}
              </StyledForm>
            </Grid>
          </Grid>
        )}
      </Formik>
    );
  }
);
