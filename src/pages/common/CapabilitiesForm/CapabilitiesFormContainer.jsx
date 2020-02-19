import React from "react";
import { connect } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setTemporaryUserData } from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import CapabilitiesForm from "./CapabilitiesForm";

const CapabilitiesFormContainer = ({
  setTemporaryUserData,
  temporaryUserData
}) => {
  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setTemporaryUserData({ ...formikValues });
  }, 250);

  return (
    <CapabilitiesForm
      temporaryUserData={temporaryUserData}
      saveChangeToRedux={saveChangeToRedux}
    />
  );
};

export default connect(({ temporaryUserData }) => ({ temporaryUserData }), {
  setTemporaryUserData
})(CapabilitiesFormContainer);
