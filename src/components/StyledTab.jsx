import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Tab } from "@material-ui/core";

export const StyledTab = withStyles(theme => ({
  root: {
    padding: "20px",

    textTransform: "none",

    background: "#EAF1FD",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "28px",
    fontSize: "24px",

    "& span": {
      userSelect: "none"
    },

    "&$selected": {
      color: "white",
      background: "#4E86E4"
    }
  },
  selected: {}
}))(props => <Tab {...props} />);
