import React, { memo } from "react";
import { Formik } from "formik";

import { ReactComponent as MinusIcon } from "../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../images/icons/add.svg";
import InputError from "../InputError";
import InputField from "../InputField";
import InputPhone from "../InputPhone";
import StyledForm from "../StyledForm";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
  setPhone,
  setFax
}) => {
  const classes = useStyles();

  const addPhoneNumber = event => {
    event.preventDefault();
    setNumberOfPhones(numberOfPhones + 1);
  };

  const removePhoneNumber = event => {
    event.preventDefault();
    setNumberOfPhones(numberOfPhones - 1);

    if (phone[2]) {
      setPhone({ id: 1, value: phone[2] });
      setPhone({ id: 2, value: "" });
    }
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

            {(phone[1] || numberOfPhones >= 2) && (
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

            {(phone[2] || numberOfPhones === 3) && (
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

            {numberOfPhones !== 3 && (
              <Button
                className={classes.plusButtonStyles}
                startIcon={<PlusIcon />}
                disableRipple
                onClick={addPhoneNumber}
              >
                add phone number
              </Button>
            )}
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(ContactsRightContent);
