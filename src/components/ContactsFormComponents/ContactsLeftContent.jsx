import React, { memo } from "react";
import { Formik, Field } from "formik";

import InputAutocomplete from "../InputAutocomplete";
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
        validateOnChange={false}
        validateOnBlur={false}
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

            <Field component={InputAutocomplete} name="mainLanguage" />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(ContactsLeftContent);
