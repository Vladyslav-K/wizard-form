import React from "react";
import { connect } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { setProfileAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import ProfileForm from "./ProfileForm";

function ProfileFormContainer({
  setProfileAsSubmitted,
  setTemporaryUserData,
  temporaryUserData
}) {
  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setTemporaryUserData(formikValues);
  }, 250);

  const handleSubmit = () => {
    setProfileAsSubmitted();
    setQueryStringIndex("step", 2);
  };

  return (
    <ProfileForm
      saveChangeToRedux={saveChangeToRedux}
      temporaryUserData={temporaryUserData}
      handleSubmit={handleSubmit}
    />
  );
}

export default connect(({ temporaryUserData }) => ({ temporaryUserData }), {
  setProfileAsSubmitted,
  setTemporaryUserData
})(ProfileFormContainer);
