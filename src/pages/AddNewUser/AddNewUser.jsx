import React, { useState } from "react";

import CapabilitiesForm from "../common/CapabilitiesForm";
import ContactsForm from "../common/ContactsForm";
import AccountForm from "../common/AccountForm";
import ProfileForm from "../common/ProfileForm";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: "none",

    background: "#EAF1FD",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "28px",
    fontSize: "24px",

    "&$selected": {
      color: "white",
      background: "#4E86E4"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  heading: {
    padding: "3rem 0",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "41px",
    fontSize: "35px"
  },

  tabIncticator: {
    display: "none"
  }
}));

export default function AddNewUser() {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <Grid className={classes.heading} container justify="center">
        Adding new user
      </Grid>

      <Tabs
        classes={{ indicator: classes.tabIncticator }}
        aria-label="Registration"
        onChange={handleChange}
        variant="fullWidth"
        value={value}
      >
        <StyledTab label="1. Account" {...a11yProps(0)} />

        <StyledTab label="2. Profile" {...a11yProps(1)} />

        <StyledTab label="3. Contacts" {...a11yProps(2)} />

        <StyledTab label="4. Capabilities" {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <AccountForm />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ProfileForm />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ContactsForm />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <CapabilitiesForm />
      </TabPanel>
    </Container>
  );
}
