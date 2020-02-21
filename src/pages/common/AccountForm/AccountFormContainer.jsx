import React, { useState } from "react";
import { connect } from "react-redux";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import AccountForm from "./AccountForm";

import { setAccountAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

function AccountFormContainer({
  temporaryUserData,

  setAccountAsSubmitted,
  setTemporaryUserData,
  saveChangeToRedux
}) {
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
      temporaryUserData={temporaryUserData}
    />
  );
}

export default connect(({ temporaryUserData }) => ({ temporaryUserData }), {
  setAccountAsSubmitted,
  setTemporaryUserData
})(AccountFormContainer);
