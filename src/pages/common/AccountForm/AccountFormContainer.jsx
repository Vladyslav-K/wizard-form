import React, { useState } from "react";
import { connect } from "react-redux";

import AccountForm from "./AccountForm";

import { setAccountData } from "../../../domain/accountFormDomain/accountFormActions";

function AccountFormContainer({
  passwordConfirmation,
  password,
  username,
  avatar,

  setAccountData
}) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const saveChangeToRedux = value => {
    setAccountData({ ...value });
  };

  return (
    <AccountForm
      passwordConfirmation={passwordConfirmation}
      saveChangeToRedux={saveChangeToRedux}
      toggleVisibility={toggleVisibility}
      password={password}
      username={username}
      visible={visible}
      avatar={avatar}
    />
  );
}

const mapStateToProps = ({
  account: { passwordConfirmation, password, username, avatar }
}) => {
  return { passwordConfirmation, password, username, avatar };
};

export default connect(mapStateToProps, { setAccountData })(
  AccountFormContainer
);
