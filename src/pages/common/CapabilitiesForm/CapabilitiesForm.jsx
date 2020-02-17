import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import Grid from "@material-ui/core/Grid";

import InputAutocomplete from "../../../components/InputAutocomplete";
import SubmitButton from "../../../components/SubmitButton";
import StyledForm from "../../../components/StyledForm";
import BackButton from "../../../components/BackButton";
import InputField from "../../../components/InputField";
import CheckBox from "../../../components/CheckBox";

const skillsList = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Angular",
  "jQuery",
  "NodeJS",
  "Python",
  "PHP",
  "Ruby On Rails",
  "SQL",
  "BackboneJS",
  "Web Design",
  "Project management",
  "Git",
  "Docker",
  "AWS Lambda",
  "Firebase"
];

const hobbiesList = [
  "Art",
  "Sport, fitness, aerobica and staff like that",
  "I just want to play games, I’m not living in this life",
  "I’m a female... I’m doing nothing. Every day.",
  "Guitar, guitar and guitar again. I’m fall in love with it.",
  "WTF is “hobbies”???"
];

const CapabilitiesForm = ({
  saveChangeToRedux,
  additionalInformation,
  hobbies,
  skills
}) => {
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={{
        additionalInformation,
        hobbies,
        skills
      }}
    >
      {({ values, errors }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          {saveChangeToRedux(values)}

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
                rows={4}
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
