import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  syncDatabaseWithProfileData,
  setFirstName,
  setBirthDate,
  setLastName,
  setAddress,
  setGender,
  setEmail
} from "../../domain/profileFormDomain/profileFormActions";

import ProfileLeftContent from "../../components/ProfileFormComponents/ProfileLeftContent";
import ProfileRightContent from "../../components/ProfileFormComponents/ProfileRightContent";

import Grid from "@material-ui/core/Grid";

function ProfileForm({
  firstName,
  birthDate,
  lastName,
  address,
  gender,
  email,

  syncDatabaseWithProfileData,
  setFirstName,
  setBirthDate,
  setLastName,
  setAddress,
  setGender,
  setEmail
}) {
  useEffect(() => {
    return () => syncDatabaseWithProfileData();
  });

  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={4}>
        <ProfileLeftContent
          firstName={firstName}
          birthDate={birthDate}
          lastName={lastName}
          setFirstName={setFirstName}
          setBirthDate={setBirthDate}
          setLastName={setLastName}
        />
      </Grid>
      <Grid item xs={4}>
        <ProfileRightContent
          address={address}
          gender={gender}
          email={email}
          setAddress={setAddress}
          setGender={setGender}
          setEmail={setEmail}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({
  profile: { firstName, birthDate, lastName, address, gender, email }
}) => {
  return { firstName, birthDate, lastName, address, gender, email };
};

export default connect(mapStateToProps, {
  syncDatabaseWithProfileData,
  setFirstName,
  setBirthDate,
  setLastName,
  setAddress,
  setGender,
  setEmail
})(ProfileForm);
