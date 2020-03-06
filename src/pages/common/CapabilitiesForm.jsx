import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import { capabilitiesFormValidationSchema } from "../../utils/validations";

import { skillsList, hobbiesList } from "../../utils/dictionaries.js";

import { Grid } from "@material-ui/core";

import { InputAutocomplete } from "../../components/InputAutocomplete";
import { StyledForm } from "../../components/StyledForm";
import { InputField } from "../../components/InputField";
import { CheckBox } from "../../components/CheckBox";

const CapabilitiesForm = ({
  saveChangeToRedux,
  initialData,
  handleSubmit,
  getButtons,
  userData
}) => {
  return (
    <Formik
      validationSchema={capabilitiesFormValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={initialData}
      onSubmit={handleSubmit}>
      {({ values, errors }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          {saveChangeToRedux(values, initialData)}

          <Grid item xs={4}>
            <StyledForm>
              <Field
                placeholder="Choose your skills"
                component={InputAutocomplete}
                errors={errors.skills}
                options={skillsList}
                label="Skills"
                name="skills"
                multiple
                required
              />

              <Field
                placeholder="You can write additional information here (maximum 300 characters)"
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

              {getButtons({
                backButton: true,
                finishButton: true,
                errors: { ...errors }
              })}
            </StyledForm>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default memo(CapabilitiesForm);
