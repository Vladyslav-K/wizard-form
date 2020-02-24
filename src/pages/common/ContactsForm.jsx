import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import { language } from "../../utils/dictionaries.js";

import { Grid } from "@material-ui/core";

import { ReactComponent as MinusIcon } from "../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../images/icons/add.svg";
import { InputAutocomplete } from "../../components/InputAutocomplete";
import { StyledForm } from "../../components/StyledForm";
import { InputField } from "../../components/InputField";
import { InputMask } from "../../components/InputMask";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const ContactsForm = memo(
  ({ userData, saveChangeToRedux, handleSubmit, getButtons }) => {
    const classes = useStyles();

    const {
      mainLanguage,
      facebookLink,
      gitHubLink,
      company,
      phones,
      fax
    } = userData;

    const contactsData = {
      mainLanguage,
      facebookLink,
      gitHubLink,
      company,
      phones,
      fax
    };

    return (
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={contactsData}
        onSubmit={handleSubmit}>
        {({ values, errors }) => (
          <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
            {saveChangeToRedux(values, contactsData)}

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
                            errors={errors.phone}
                            component={InputMask}
                          />

                          {index > 0 && (
                            <Button
                              className={classes.minusButtonStyles}
                              onClick={() => arrayHelpers.remove(index)}>
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
                          onClick={() => arrayHelpers.push("")}>
                          add phone number
                        </Button>
                      )}
                    </div>
                  )}
                />

                <Grid container justify="space-between">
                  {getButtons("getBackButton")}
                </Grid>
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
    marginTop: "20px",
    minWidth: 0
  },

  phoneContainer: {
    display: "flex",
    width: "100%"
  }
}));
