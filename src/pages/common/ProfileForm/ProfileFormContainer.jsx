import React from "react";
import { connect } from "react-redux";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { setProfileAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import { ProfileForm } from "./ProfileForm";

function ConnectedProfileFormContainer({
  setProfileAsSubmitted,
  setTemporaryUserData,
  saveChangeToRedux,
  profileData
}) {
  const handleSubmit = () => {
    setProfileAsSubmitted();
    setQueryStringIndex("step", 2);
  };

  return (
    <ProfileForm
      profileData={profileData}
      saveChangeToRedux={saveChangeToRedux}
      handleSubmit={handleSubmit}
    />
  );
}

export const ProfileFormContainer = connect(
  ({
    temporaryUserData: {
      firstName,
      birthDate,
      lastName,
      address,
      gender,
      email
    }
  }) => ({
    profileData: { firstName, birthDate, lastName, address, gender, email }
  }),
  {
    setProfileAsSubmitted,
    setTemporaryUserData
  }
)(ConnectedProfileFormContainer);
