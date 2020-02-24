import React from "react";

import { Typography, Box } from "@material-ui/core";

export const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      aria-labelledby={`nav-tab-${index}`}
      id={`nav-tabpanel-${index}`}
      hidden={value !== index}
      component="div"
      role="tabpanel"
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};
