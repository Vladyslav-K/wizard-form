import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEqual from "lodash.isequal";
import lodashPick from "lodash.pick";

import { useDebouncedCallback } from "use-debounce";

import { getQueryStringValue, setQueryString } from "../utils/helpers.js";

import {
  CAPABILITIES_TAB_INDEX,
  CONTACTS_TAB_INDEX,
  PROFILE_TAB_INDEX,
  ACCOUNT_TAB_INDEX,
  fields
} from "../utils/constants.js";

import {
  saveCurrentUserToList,
  setCurrentUserData,
  getUserFromList
} from "../domain/currentUserDomain/currentUserActions.js";

import { CapabilitiesForm } from "./common/CapabilitiesForm";
import { ContactsForm } from "./common/ContactsForm";
import { ProfileForm } from "./common/ProfileForm";
import { AccountForm } from "./common/AccountForm";

import { SubmitButton } from "../components/SubmitButton.jsx";
import { StyledTab } from "../components/StyledTab.jsx";
import { TabPanel } from "../components/TabPanel.jsx";

import { ReactComponent as ArrowIcon } from "../images/icons/Rectangle.svg";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button, Container, Tabs, Grid } from "@material-ui/core";

const ConnectedEditing = ({
  saveCurrentUserToList,
  setCurrentUserData,
  getUserFromList,
  currentUserData,
  userList,

  location,
  history,
  match
}) => {
  const classes = useStyles();

  const [tabIndex, setTabIndex] = useState(0);

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const queryTab = getQueryStringValue("tab", location.search);

    setTabIndex(
      queryTab === "capabilities"
        ? CAPABILITIES_TAB_INDEX
        : queryTab === "contacts"
        ? CONTACTS_TAB_INDEX
        : queryTab === "profile"
        ? PROFILE_TAB_INDEX
        : ACCOUNT_TAB_INDEX
    );
  }, [location.search]);

  useEffect(() => {
    const queryTab = getQueryStringValue("tab", location.search);

    if (!queryTab) {
      setQueryString("tab", "account");
    }

    getUserFromList({ id: +match.params.id });
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, value) => {
    setQueryString(
      "tab",
      value === CAPABILITIES_TAB_INDEX
        ? "capabilities"
        : value === CONTACTS_TAB_INDEX
        ? "contacts"
        : value === PROFILE_TAB_INDEX
        ? "profile"
        : "account"
    );
  };

  const [saveChangeToRedux] = useDebouncedCallback((formikValues, userData) => {
    if (!isEqual(formikValues, userData)) {
      setCurrentUserData(formikValues);
    }
  }, 250);

  const handleSubmit = () => {
    saveCurrentUserToList({ userData: currentUserData, id: +match.params.id });
  };

  const getButtons = () => {
    return (
      <>
        <SubmitButton save />
      </>
    );
  };

  const handleClick = () => {
    history.push({ pathname: `/users/view/${+match.params.id}` });
  };

  const accountData = lodashPick(currentUserData, Object.keys(fields.account));
  const profileData = lodashPick(currentUserData, Object.keys(fields.profile));
  const contactsData = lodashPick(
    currentUserData,
    Object.keys(fields.contacts)
  );
  const capabilitiesData = lodashPick(
    currentUserData,
    Object.keys(fields.capabilities)
  );

  return (
    <Container maxWidth="md">
      <Grid container justify="space-between">
        <Grid item xs={3}>
          <IconButton onClick={handleClick}>
            <ArrowIcon />
          </IconButton>

          <Button className={classes.linkToUsers} onClick={handleClick}>
            User Profile
          </Button>
        </Grid>
        <Grid className={classes.heading} item xs={7}>
          Editing
        </Grid>
      </Grid>

      <Tabs
        classes={{ indicator: classes.tabIncticator }}
        aria-label="Registration"
        onChange={handleChange}
        variant="fullWidth"
        value={tabIndex}>
        <StyledTab label="1. Account" {...a11yProps(0)} />

        <StyledTab label="2. Profile" {...a11yProps(1)} />

        <StyledTab label="3. Contacts" {...a11yProps(2)} />

        <StyledTab label="4. Capabilities" {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <AccountForm
          saveChangeToRedux={saveChangeToRedux}
          toggleVisibility={toggleVisibility}
          handleSubmit={handleSubmit}
          accountData={accountData}
          getButtons={getButtons}
          visible={visible}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ProfileForm
          saveChangeToRedux={saveChangeToRedux}
          handleSubmit={handleSubmit}
          profileData={profileData}
          getButtons={getButtons}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <ContactsForm
          saveChangeToRedux={saveChangeToRedux}
          handleSubmit={handleSubmit}
          contactsData={contactsData}
          getButtons={getButtons}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <CapabilitiesForm
          saveChangeToRedux={saveChangeToRedux}
          capabilitiesData={capabilitiesData}
          handleSubmit={handleSubmit}
          getButtons={getButtons}
        />
      </TabPanel>
    </Container>
  );
};

function a11yProps(index) {
  return {
    "aria-controls": `nav-tabpanel-${index}`,
    id: `nav-tab-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  heading: {
    margin: "3rem 0",

    color: "#475666",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "41px",
    fontSize: "35px"
  },

  linkToUsers: {
    justifyContent: "center",

    margin: "3rem 0",

    color: "#9BB0CB",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "28px",
    fontSize: "24px",

    textTransform: "none"
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

export const Editing = connect(
  ({ currentUserData, listOfUsers: { userList } }) => ({
    currentUserData,
    userList
  }),
  {
    saveCurrentUserToList,
    setCurrentUserData,
    getUserFromList
  }
)(ConnectedEditing);
