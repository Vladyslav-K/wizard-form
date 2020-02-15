import React from "react";
import { connect } from "react-redux";

import { setProfileData } from "../../../domain/profileFormDomain/profileFormActions";

import ProfileForm from "./ProfileForm";

function ProfileFormContainer({
  firstName,
  birthDate,
  lastName,
  address,
  gender,
  email,

  setProfileData
}) {
  const saveChangeToRedux = value => {
    setProfileData({ ...value });
  };

  return (
    <ProfileForm
      saveChangeToRedux={saveChangeToRedux}
      firstName={firstName}
      birthDate={birthDate}
      lastName={lastName}
      address={address}
      gender={gender}
      email={email}
    />
  );
}

const mapStateToProps = ({
  profile: { firstName, birthDate, lastName, address, gender, email }
}) => {
  return { firstName, birthDate, lastName, address, gender, email };
};

export default connect(mapStateToProps, { setProfileData })(
  ProfileFormContainer
);
