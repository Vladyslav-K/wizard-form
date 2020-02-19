import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import { compareValuesAndCheckForEmptiness } from "../../../utils/helpers.js";

import Grid from "@material-ui/core/Grid";

import { ReactComponent as MinusIcon } from "../../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../images/icons/add.svg";
import InputAutocomplete from "../../../components/InputAutocomplete";
import SubmitButton from "../../../components/SubmitButton";
import StyledForm from "../../../components/StyledForm";
import BackButton from "../../../components/BackButton";
import InputField from "../../../components/InputField";
import InputMask from "../../../components/InputMask";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ContactsForm = ({ saveChangeToRedux, handleSubmit, contacts }) => {
  const classes = useStyles();

  const {
    mainLanguage,
    facebookLink,
    gitHubLink,
    company,
    phones,
    fax
  } = contacts;

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={{
        mainLanguage,
        facebookLink,
        gitHubLink,
        company,
        phones,
        fax
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          {compareValuesAndCheckForEmptiness(values, contacts) &&
            saveChangeToRedux(values)}

          <Grid item xs={4}>
            <StyledForm>
              <Field
                errors={errors.company}
                component={InputField}
                label="Company"
                name="company"
              />

              <Field
                errors={errors.gitHubLink}
                component={InputField}
                label="GitHub link"
                name="gitHubLink"
                required
              />

              <Field
                placeholder="www.facebook.com/hdfk_142_23lelf/"
                errors={errors.facebookLink}
                component={InputField}
                label="Facebook link"
                name="facebookLink"
                required
              />

              <Field
                component={InputAutocomplete}
                label="Main language"
                name="mainLanguage"
                options={language}
                required
              />
            </StyledForm>
          </Grid>

          <Grid item xs={4}>
            <StyledForm>
              <Field
                component={InputMask}
                errors={errors.fax}
                label="Fax"
                name="fax"
                required
              />

              <FieldArray
                name="phones"
                render={arrayHelpers => (
                  <div>
                    {values.phones.map((phone, index) => (
                      <div key={index} className={classes.phoneContainer}>
                        <Field
                          label={`Phone #${index + 1}`}
                          name={`phones.${index}`}
                          required={index === 0}
                          errors={errors.phone}
                          component={InputMask}
                        />

                        {index > 0 && (
                          <Button
                            className={classes.minusButtonStyles}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <MinusIcon />
                          </Button>
                        )}
                      </div>
                    ))}
                    {values.phones.length < 3 && (
                      <Button
                        className={classes.plusButtonStyles}
                        startIcon={<PlusIcon />}
                        disableRipple
                        onClick={() => arrayHelpers.push("")}
                      >
                        add phone number
                      </Button>
                    )}
                  </div>
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

export default memo(ContactsForm);

const useStyles = makeStyles(theme => ({
  plusButtonStyles: {
    justifyContent: "flex-start",
    textTransform: "none"
  },

  minusButtonStyles: {
    marginTop: "20px",
    minWidth: 0
  },

  phoneContainer: {
    display: "flex",
    width: "100%"
  }
}));

const language = [
  "English",
  "French",
  "Spanish",
  "Arabic",
  "Mandarin",
  "Russian",
  "Portuguese",
  "German",
  "Japanese",
  "Hindi",
  "Malay",
  "Persian",
  "Swahili",
  "Tamil",
  "Italian",
  "Dutch",
  "Bengali",
  "Turkish",
  "Vietnamese",
  "Polish",
  "Javanese",
  "Punjabi",
  "Thai",
  "Korean"
];