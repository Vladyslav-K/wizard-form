import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import AccountLeftContent from "../../components/AccountFormComponents/AccountLeftContent";
import AccountRightContent from "../../components/AccountFormComponents/AccountRightContent";

import {
  syncDatabaseWithAccountData,
  setPasswordConfirmation,
  setPassword,
  setUserName,
  setAvatar
} from "../../domain/accountFormDomain/accountFormActions";

import Grid from "@material-ui/core/Grid";

function AccountForm({
  passwordConfirmation,
  password,
  username,
  avatar,

  syncDatabaseWithAccountData,
  setPasswordConfirmation,
  setPassword,
  setUserName,
  setAvatar
}) {
  useEffect(() => {
    return () => syncDatabaseWithAccountData();
  });

  const [visible, setVisible] = useState(false);

  const [avatarSizeValidation, setAvatarSizeValidation] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();

    const file = event.target.files[0];

    reader.onload = () => {
      if (file.size < 1000000) {
        setAvatarSizeValidation(true);

        setAvatar(reader.result);
      } else {
        setAvatarSizeValidation(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Grid container justify="space-around" style={{ marginTop: "2rem" }}>
      <Grid item xs={3}>
        <AccountLeftContent
          avatar={avatar}
          setAvatar={setAvatar}
          handleImageChange={handleImageChange}
          avatarSizeValidation={avatarSizeValidation}
        />
      </Grid>
      <Grid item xs={5}>
        <AccountRightContent
          passwordConfirmation={passwordConfirmation}
          password={password}
          username={username}
          setPasswordConfirmation={setPasswordConfirmation}
          setPassword={setPassword}
          setUserName={setUserName}
          visible={visible}
          toggleVisibility={toggleVisibility}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({
  account: { passwordConfirmation, password, username, avatar }
}) => {
  return { passwordConfirmation, password, username, avatar };
};

export default connect(mapStateToProps, {
  syncDatabaseWithAccountData,
  setPasswordConfirmation,
  setPassword,
  setUserName,
  setAvatar
})(AccountForm);
