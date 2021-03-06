import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

// form validations
import { contactsFormValidationSchema } from "../../utils/validations.js";

// dictionary
import { language } from "../../utils/dictionaries.js";

// plus icon
import { ReactComponent as PlusIcon } from "../../images/icons/add.svg";

// components
import { InputAutocomplete } from "../../components/InputAutocomplete";
import { PhonesInput } from "../../components/PhonesInput.jsx";
import { StyledForm } from "../../components/StyledForm";
import { InputField } from "../../components/InputField";
import { InputMask } from "../../components/InputMask";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

export const ContactsForm = ({
  initialData,

  pushPhoneNumber,
  handleSubmit,
  saveUser,
  getButtons
}) => {
  const classes = useStyles();

  const initialPhones = initialData => {
    // if the user doesn't have a phone yet, create an empty form
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
                saveUser={saveUser}
              />

              <Field
                placeholder="https://github.com/Vladyslav-K"
                errors={errors.gitHubLink}
                component={InputField}
                label="GitHub link"
                name="gitHubLink"
                required
                handleChange={handleChange}
                saveUser={saveUser}
              />

              <Field
                placeholder="www.facebook.com/hdfk_142_23lelf/"
                errors={errors.facebookLink}
                component={InputField}
                label="Facebook link"
                name="facebookLink"
                required
                handleChange={handleChange}
                saveUser={saveUser}
              />

              <Field
                placeholder="Choose your main language"
                component={InputAutocomplete}
                errors={errors.mainLanguage}
                label="Main language"
                name="mainLanguage"
                options={language}
                required
                saveUser={saveUser}
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
                handleChange={handleChange}
                saveUser={saveUser}
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
                        component={PhonesInput}
                        key={index}
                        handleChange={handleChange}
                        saveUser={saveUser}
                        onClick={() => {
                          arrayHelpers.remove(index);

                          saveUser({
                            phones: [
                              ...values.phones.slice(0, index),
                              ...values.phones.slice(index + 1)
                            ]
                          });
                        }}
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

              <div className={classes.buttonsContainer}>
                {getButtons({ backButton: true, errors: { ...errors } })}
              </div>
            </StyledForm>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    marginTop: "15vh"
  },

  plusButtonStyles: {
    justifyContent: "flex-start",
    textTransform: "none"
  }
}));

export default memo(ContactsForm);
