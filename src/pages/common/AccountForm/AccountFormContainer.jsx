import React, { useState } from "react";
import { connect } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import AccountForm from "./AccountForm";

import { setAccountAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

function AccountFormContainer({
  temporaryUserData,
  setAccountAsSubmitted,
  setTemporaryUserData
}) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setTemporaryUserData(formikValues);
  }, 250);

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
