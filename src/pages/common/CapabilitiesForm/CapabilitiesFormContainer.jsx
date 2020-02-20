import React from "react";
import { connect } from "react-redux";
import { createHashHistory } from "history";
import { useDebouncedCallback } from "use-debounce";

import {
  removeTemporaryUserData,
  setTemporaryUserData
} from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import { addUserToList } from "../../../domain/userListDomain/userListActions.js";

import CapabilitiesForm from "./CapabilitiesForm";

const CapabilitiesFormContainer = ({
  removeTemporaryUserData,
  setTemporaryUserData,
  temporaryUserData,
  addUserToList,
  history
}) => {
  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setTemporaryUserData({ ...formikValues });
  }, 250);

  const handleSubmit = () => {
    addUserToList(temporaryUserData);
    
    const history = createHashHistory();
    history.push("/users")

    removeTemporaryUserData();
  };

  return (
    <CapabilitiesForm
      temporaryUserData={temporaryUserData}
      saveChangeToRedux={saveChangeToRedux}
      handleSubmit={handleSubmit}
    />
  );
};

export default connect(({ temporaryUserData }) => ({ temporaryUserData }), {
  removeTemporaryUserData,
  setTemporaryUserData,
  addUserToList
})(CapabilitiesFormContainer);
