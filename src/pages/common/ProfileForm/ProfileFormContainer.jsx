import React from "react";
import { connect } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { setProfileAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setProfileData } from "../../../domain/profileFormDomain/profileFormActions";

import ProfileForm from "./ProfileForm";

function ProfileFormContainer({
  setProfileAsSubmitted,
  setProfileData,
  profile
}) {
  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setProfileData({ ...formikValues });
  }, 250);

  const handleSubmit = () => {
    setProfileAsSubmitted();
    setQueryStringIndex("step", 2);
  };

  return (
    <ProfileForm
      saveChangeToRedux={saveChangeToRedux}
      handleSubmit={handleSubmit}
      profile={profile}
    />
  );
}

const mapStateToProps = ({ profile }) => {
  return { profile };
};

export default connect(mapStateToProps, {
  setProfileAsSubmitted,
  setProfileData
})(ProfileFormContainer);
