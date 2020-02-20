import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getQueryStringIndex, setQueryStringIndex } from "../utils/helpers.js";

import CapabilitiesFormContainer from "./common/CapabilitiesForm/CapabilitiesFormContainer";
import ContactsFormContainer from "./common/ContactsForm/ContactsFormContainer";
import AccountFormContainer from "./common/AccountForm/AccountFormContainer";
import ProfileFormContainer from "./common/ProfileForm/ProfileFormContainer";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const AddNewUser = ({
  history,
  location,

  capabilitiesIsSubmitted,
  contactsIsSubmitted,
  accountIsSubmitted,
  profileIsSubmitted
}) => {
  const classes = useStyles();

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const queryIndex = getQueryStringIndex("step", location.search);

    setTabIndex(queryIndex);
  }, [location.search]);

  useEffect(() => {
    history.push({ search: "?step=0" });
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, value) => {
    setQueryStringIndex("step", value);
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
        value={tabIndex}
      >
        <StyledTab label="1. Account" {...a11yProps(0)} />

        <StyledTab
          disabled={!accountIsSubmitted}
          label="2. Profile"
          {...a11yProps(1)}
        />

        <StyledTab
          disabled={!profileIsSubmitted}
          label="3. Contacts"
          {...a11yProps(2)}
        />

        <StyledTab
          disabled={!contactsIsSubmitted}
          label="4. Capabilities"
          {...a11yProps(3)}
        />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <AccountFormContainer />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ProfileFormContainer />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <ContactsFormContainer />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <CapabilitiesFormContainer />
      </TabPanel>
    </Container>
  );
};

const mapStateToProps = ({
  submitted: {
    capabilitiesIsSubmitted,
    contactsIsSubmitted,
    accountIsSubmitted,
    profileIsSubmitted
  }
}) => {
  return {
    capabilitiesIsSubmitted,
    contactsIsSubmitted,
    accountIsSubmitted,
    profileIsSubmitted
  };
};

export default connect(mapStateToProps, {})(AddNewUser);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      aria-labelledby={`nav-tab-${index}`}
      id={`nav-tabpanel-${index}`}
      hidden={value !== index}
      component="div"
      role="tabpanel"
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    "aria-controls": `nav-tabpanel-${index}`,
    id: `nav-tab-${index}`
  };
}

const StyledTab = withStyles(theme => ({
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
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  heading: {
    padding: "3rem 0",

    color: "#475666",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "41px",
    fontSize: "35px"
  },

  queryContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "10px 24px",

    background: "#5E97F3",

    "& span": {
      textTransform: "none",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: "14px",
      lineHeight: "16px",
      color: "white"
    }
  },

  queryText: {
    fontWeight: 500
  },

  queryButton: {
    fontWeight: 900,

    padding: "0 10px"
  },

  tabIncticator: {
    display: "none"
  }
}));
