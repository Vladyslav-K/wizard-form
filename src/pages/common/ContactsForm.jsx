import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import { contactsFormValidationSchema } from "../../utils/validations";

import { language } from "../../utils/dictionaries.js";

import { Grid } from "@material-ui/core";

import { ReactComponent as PlusIcon } from "../../images/icons/add.svg";
import { InputAutocomplete } from "../../components/InputAutocomplete";
import { StyledForm } from "../../components/StyledForm";
import { InputField } from "../../components/InputField";
import { InputMask } from "../../components/InputMask";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const ContactsForm = memo(
  ({ saveChangeToRedux, handleSubmit, getButtons, initialData }) => {
    const classes = useStyles();

    return (
      <Formik
        validationSchema={contactsFormValidationSchema}
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
                  errors={errors.mainLanguage}
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
                        <div key={index}>
                          <Field
                            index={index}
                            label={`Phone #${index + 1}`}
                            name={`phones.${index}`}
                            errors={errors.phones && errors.phones[index]}
                            onClick={() => arrayHelpers.remove(index)}
                            component={InputMask}
                          />
                        </div>
                      ))}
                      {values.phones.length < 3 && (
                        <Button
                          className={classes.plusButtonStyles}
                          startIcon={<PlusIcon />}
                          disableRipple
                          onClick={() => arrayHelpers.push("")}>
                          add phone number
                        </Button>
                      )}
                    </div>
                  )}
                />

                {getButtons("getBackButton")}
              </StyledForm>
            </Grid>
          </Grid>
        )}
      </Formik>
    );
  }
);

const useStyles = makeStyles(theme => ({
  plusButtonStyles: {
    justifyContent: "flex-start",
    textTransform: "none"
  },

  minusButtonStyles: {
    minWidth: 0
  }
}));
