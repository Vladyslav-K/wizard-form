import React, { memo } from "react";
import { Formik, Field } from "formik";

import InputAutocomplete from "../InputAutocomplete";
import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

const ContactsLeftContent = ({
  saveChangeToRedux,
  mainLanguage,
  facebookLink,
  gitHubLink,
  company
}) => {
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          company,
          gitHubLink,
          facebookLink,
          mainLanguage
        }}
      >
        {({ values, errors }) => (
          <StyledForm>
            {saveChangeToRedux(values)}

            <Field component={InputField} name="company" label="Company" />

            {errors.company && <InputError value={errors.company} />}

            <Field
              component={InputField}
              label="GitHub link"
              name="gitHubLink"
              required
            />

            {errors.gitHubLink && <InputError value={errors.gitHubLink} />}

            <Field
              placeholder="www.facebook.com/hdfk_142_23lelf/"
              component={InputField}
              label="Facebook link"
              name="facebookLink"
              required
            />

            {errors.facebookLink && <InputError value={errors.facebookLink} />}

            <Field component={InputAutocomplete} name="mainLanguage" />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(ContactsLeftContent);
