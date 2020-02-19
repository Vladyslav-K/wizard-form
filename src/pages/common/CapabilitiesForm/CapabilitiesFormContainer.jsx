import React from "react";
import { connect } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

import { setCapabilitiesData } from "../../../domain/capabilitiesFormDomain/capabilitiesFormActions";

import CapabilitiesForm from "./CapabilitiesForm";

const CapabilitiesFormContainer = ({ setCapabilitiesData, capabilities }) => {
  const [saveChangeToRedux] = useDebouncedCallback(formikValues => {
    setCapabilitiesData({ ...formikValues });
  }, 250);

  return (
    <CapabilitiesForm
      saveChangeToRedux={saveChangeToRedux}
      capabilities={capabilities}
    />
  );
};

const mapStateToProps = ({ capabilities }) => {
  return { capabilities };
};

export default connect(mapStateToProps, { setCapabilitiesData })(
  CapabilitiesFormContainer
);
