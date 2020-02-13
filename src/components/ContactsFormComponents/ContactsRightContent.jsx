import React, { useEffect, memo } from "react";
import { Formik } from "formik";

import { ReactComponent as MinusIcon } from "../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../images/icons/add.svg";
import SubmitButton from "../SubmitButton";
import BackButton from "../BackButton";
import InputError from "../InputError";
import InputField from "../InputField";
import InputPhone from "../InputPhone";
import StyledForm from "../StyledForm";

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

const ContactsRightContent = ({
  numberOfPhones,
  setNumberOfPhones,
  phone,
  fax,
  removePhone,
  setPhone,
  setFax
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (phone[1] && phone[2]) {
      setNumberOfPhones(2);
    }

    if (phone[1]) {
      setNumberOfPhones(1);
    }

    if ((phone[1] === "+7 (XXX) XXX-XX-XX" || !phone[1]) && phone[2]) {
      setPhone({ id: 1, value: phone[2] });
      removePhone({ id: 2 });
      setNumberOfPhones(1);
    }
    //eslint-disable-next-line
  }, []);

  const addPhoneNumber = event => {
    event.preventDefault();

    setNumberOfPhones(numberOfPhones + 1);
  };

  const removePhoneNumber = event => {
    event.preventDefault();

    if (phone[2]) {
      setPhone({ id: 1, value: phone[2] });
      removePhone({ id: 2 });
    }

    setNumberOfPhones(numberOfPhones - 1);
    removePhone({ id: numberOfPhones });
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          fax,
          firstPhone: phone[0],
          secondPhone: phone[1],
          thirdPhone: phone[2]
        }}
      >
        {({ errors }) => (
          <StyledForm>
            <InputField
              label="Fax"
              value={fax}
              name="fax"
              required
              onChange={event => setFax(event.target.value)}
            />
            {errors.fax && <InputError value={errors.fax} />}
            <InputPhone
              labelName="Phone #1"
              setPhone={setPhone}
              name="firstPhone"
              phone={phone}
              required
              id="0"
            />

            {(phone[1] || numberOfPhones >= 1) && (
              <div className={classes.phoneContainer}>
                <InputPhone
                  labelName="Phone #2"
                  setPhone={setPhone}
                  name="secondPhone"
                  phone={phone}
                  id="1"
                />

                <Button
                  className={classes.minusButtonStyles}
                  onClick={removePhoneNumber}
                >
                  <MinusIcon />
                </Button>
              </div>
            )}

            {(phone[2] || numberOfPhones === 2) && (
              <div className={classes.phoneContainer}>
                <InputPhone
                  labelName="Phone #3"
                  setPhone={setPhone}
                  name="thirdPhone"
                  phone={phone}
                  id="2"
                />

                <Button
                  className={classes.minusButtonStyles}
                  onClick={removePhoneNumber}
                >
                  <MinusIcon />
                </Button>
              </div>
            )}

            {!phone[2] && numberOfPhones !== 2 && (
              <Button
                className={classes.plusButtonStyles}
                startIcon={<PlusIcon />}
                disableRipple
                onClick={addPhoneNumber}
              >
                add phone number
              </Button>
            )}
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
