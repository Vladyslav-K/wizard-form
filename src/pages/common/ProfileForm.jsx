import React from "react";
import { connect } from "react-redux";

import { setProfileData } from "../../domain/profileFormDomain/profileFormActions";

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

  setProfileData
}) {
  const saveChangeToRedux = value => {
    setProfileData({ ...value });
  };

  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={4}>
        <ProfileLeftContent
          saveChangeToRedux={saveChangeToRedux}
          firstName={firstName}
          birthDate={birthDate}
          lastName={lastName}
        />
      </Grid>
      <Grid item xs={4}>
        <ProfileRightContent
          saveChangeToRedux={saveChangeToRedux}
          address={address}
          gender={gender}
          email={email}
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

export default connect(mapStateToProps, { setProfileData })(ProfileForm);
