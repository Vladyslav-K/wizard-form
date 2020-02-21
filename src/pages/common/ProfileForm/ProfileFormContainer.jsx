import React from "react";
import { connect } from "react-redux";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { setProfileAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import ProfileForm from "./ProfileForm";

function ProfileFormContainer({
  setProfileAsSubmitted,
  setTemporaryUserData,
  saveChangeToRedux,
  temporaryUserData
}) {
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
