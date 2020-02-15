import React, { memo } from "react";
import { Formik, Field, FieldArray } from "formik";

import { ReactComponent as MinusIcon } from "../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../images/icons/add.svg";
import SubmitButton from "../SubmitButton";
import BackButton from "../BackButton";
import StyledForm from "../StyledForm";
import InputMask from "../InputMask";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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

const ContactsRightContent = ({ saveChangeToRedux, phones, fax }) => {
  const classes = useStyles();

  return (
    <div>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        initialValues={{
          fax,
          phones
        }}
      >
        {({ values, errors }) => (
          <StyledForm>
            {saveChangeToRedux(values)}

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
                        errors={errors.phone}
                        name={`phones.${index}`}
                        required={index === 0}
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
        )}
      </Formik>
    </div>
  );
};

export default memo(ContactsRightContent);
