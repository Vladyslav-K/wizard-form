import React from "react";
import { connect } from "react-redux";

import { setCapabilitiesData } from "../../../domain/capabilitiesFormDomain/capabilitiesFormActions";

import CapabilitiesForm from "./CapabilitiesForm";

const CapabilitiesFormContainer = ({
  setCapabilitiesData,
  additionalInformation,
  hobbies,
  skills
}) => {
  const saveChangeToRedux = value => {
    setCapabilitiesData({ ...value });
  };

  return (
    <CapabilitiesForm
      saveChangeToRedux={saveChangeToRedux}
      additionalInformation={additionalInformation}
      hobbies={hobbies}
      skills={skills}
    />
  );
};

const mapStateToProps = ({
  capabilities: { additionalInformation, hobbies, skills }
}) => {
  return { additionalInformation, hobbies, skills };
};

export default connect(mapStateToProps, { setCapabilitiesData })(
  CapabilitiesFormContainer
);
