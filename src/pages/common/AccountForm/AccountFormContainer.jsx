import React, { useState } from "react";
import { connect } from "react-redux";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import { AccountForm } from "./AccountForm";

import { setAccountAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

const ConnectedAccountFormContainer = ({
  accountData,

  setAccountAsSubmitted,
  setTemporaryUserData,
  saveChangeToRedux
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleSubmit = () => {
    setAccountAsSubmitted();
    setQueryStringIndex("step", 1);
  };

  return (
    <AccountForm
      saveChangeToRedux={saveChangeToRedux}
      toggleVisibility={toggleVisibility}
      handleSubmit={handleSubmit}
      visible={visible}
      accountData={accountData}
    />
  );
};

export const AccountFormContainer = connect(
  ({
    temporaryUserData: { passwordConfirmation, password, username, avatar }
  }) => ({ accountData: { passwordConfirmation, password, username, avatar } }),
  {
    setAccountAsSubmitted,
    setTemporaryUserData
  }
)(ConnectedAccountFormContainer);
