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

export const ContactsForm = ({
  initialData,

  pushPhoneNumber,
  handleSubmit,
  handleBlur,
  getButtons
}) => {
  const classes = useStyles();

  const initialPhones = initialData => {
    return initialData.phones.length === 0 ? [""] : initialData.phones;
  };

  return (
    <Formik
      validationSchema={contactsFormValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={{ ...initialData, phones: initialPhones(initialData) }}
      onSubmit={handleSubmit}>
      {({ values, errors, handleChange }) => (
        <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
          <Grid item xs={4}>
            <StyledForm>
              <Field
                placeholder="Enter company"
                errors={errors.company}
                component={InputField}
                label="Company"
                name="company"
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Field
                placeholder="https://github.com/Vladyslav-K"
                errors={errors.gitHubLink}
                component={InputField}
                label="GitHub link"
                name="gitHubLink"
                required
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Field
                placeholder="www.facebook.com/hdfk_142_23lelf/"
                errors={errors.facebookLink}
                component={InputField}
                label="Facebook link"
                name="facebookLink"
                required
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Field
                placeholder="Choose your main language"
                errors={errors.mainLanguage}
                component={InputAutocomplete}
                label="Main language"
                name="mainLanguage"
                options={language}
                required
                handleBlur={handleBlur}
              />
            </StyledForm>
          </Grid>

          <Grid item xs={4}>
            <StyledForm>
              <Field
                placeholder="Enter fax"
                component={InputMask}
                errors={errors.fax}
                label="Fax"
                name="fax"
                required
                handleBlur={handleBlur}
              />

              <FieldArray
                name="phones"
                render={arrayHelpers => (
                  <>
                    {values.phones.map((phone, index) => (
                      <Field
                        errors={errors.phones && errors.phones[index]}
                        label={`Phone #${index + 1}`}
                        index={values.phones.length}
                        placeholder="Enter phone"
                        name={`phones.${index}`}
                        component={InputMask}
                        key={index}
                        phonesInput
                        onClick={() => arrayHelpers.remove(index)}
                        pushPhoneNumber={pushPhoneNumber}
                        handleBlur={handleBlur}
                      />
                    ))}

                    {values.phones.length < 3 && (
                      <Button
                        className={classes.plusButtonStyles}
                        startIcon={<PlusIcon />}
                        onClick={() => arrayHelpers.push("")}>
                        add phone number
                      </Button>
                    )}
                  </>
                )}
              />

              {getButtons({ backButton: true, errors: { ...errors } })}
            </StyledForm>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(theme => ({
  plusButtonStyles: {
    justifyContent: "flex-start",
    textTransform: "none"
  },

  minusButtonStyles: {
    minWidth: 0
  }
}));

export default memo(ContactsForm);
