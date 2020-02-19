import React, { useState } from "react";
import { connect } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setQueryStringIndex } from "../../../utils/helpers.js";

import AccountForm from "./AccountForm";

import { setAccountAsSubmitted } from "../../../domain/submittedFormsDomain/submittedFormsActions.js";
import { setAccountData } from "../../../domain/accountFormDomain/accountFormActions";

function AccountFormContainer({
  account,

  setAccountAsSubmitted,
  setAccountData
}) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setAccountData({ ...formikValues });
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
      account={account}
    />
  );
}

const mapStateToProps = ({ account }) => {
  return { account };
};

export default connect(mapStateToProps, {
  setAccountAsSubmitted,
  setAccountData
})(AccountFormContainer);
