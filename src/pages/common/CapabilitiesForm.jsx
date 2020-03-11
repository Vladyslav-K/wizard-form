import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

// form validations
import { capabilitiesFormValidationSchema } from "../../utils/validations";

// dictionaries
import { skillsList, hobbiesList } from "../../utils/dictionaries.js";

// components
import { InputAutocomplete } from "../../components/InputAutocomplete";
import { StyledForm } from "../../components/StyledForm";
import { InputField } from "../../components/InputField";
import { CheckBox } from "../../components/CheckBox";

// styles
import { Grid } from "@material-ui/core";

const CapabilitiesForm = ({
  initialData,

  handleSubmit,
  saveUser,
  getButtons
}) => {
  return (
    <Formik
      validationSchema={capabilitiesFormValidationSchema}
      initialValues={initialData}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      onSubmit={handleSubmit}>
      {({ errors, handleChange }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
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
                saveUser={saveUser}
              />

              <Field
                placeholder="You can write additional information here (maximum 300 characters)"
                errors={errors.additionalInformation}
                label="Additional information"
                name="additionalInformation"
                component={InputField}
                multiline
                rows={5}
                handleChange={handleChange}
                saveUser={saveUser}
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
                    name="hobbies"
                    saveUser={saveUser}
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
