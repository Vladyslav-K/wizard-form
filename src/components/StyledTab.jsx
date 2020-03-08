import React from "react";

// styles
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
      background: "#4E86E4",
      color: "white"
    }
  },
  
  selected: {}
}))(props => <Tab {...props} />);
