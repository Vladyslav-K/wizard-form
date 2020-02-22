import React from "react";
import { connect } from "react-redux";
import { createHashHistory } from "history";

import {
  removeTemporaryUserData,
  setTemporaryUserData
} from "../../../domain/temporaryUserDomain/temporaryUserActions.js";

import { addUserToList } from "../../../domain/userListDomain/userListActions.js";

import CapabilitiesForm from "./CapabilitiesForm";

const CapabilitiesFormContainer = ({
  removeTemporaryUserData,
  setTemporaryUserData,
  saveChangeToRedux,
  temporaryUserData,
  addUserToList,
  history
}) => {
  const handleSubmit = () => {
    addUserToList(temporaryUserData);

    const history = createHashHistory();
    history.push("/users");

    removeTemporaryUserData();
  };

  const { additionalInformation, hobbies, skills } = temporaryUserData;

  const capabilitiesData = { additionalInformation, hobbies, skills };

  return (
    <CapabilitiesForm
      capabilitiesData={capabilitiesData}
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
