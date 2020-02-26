import React, { useState, useEffect } from "react";
import { createHashHistory } from "history";
import { connect } from "react-redux";
import isEqual from "lodash.isequal";
import lodashPick from "lodash.pick";

import { useDebouncedCallback } from "use-debounce";

import {
  checkObjectPropsIsNotEmpty,
  getQueryStringValue,
  setQueryString,
  getTabKeyByValue,
  getTabValueByKey
} from "../utils/helpers.js";

import { fields } from "../utils/constants.js";

import {
  getTemporaryUserDataWithDatabase,
  removeTemporaryUserData,
  setTemporaryUserData
} from "../domain/temporaryUserDomain/temporaryUserActions.js";

import { addUserToList } from "../domain/userListDomain/userListActions.js";

import { CapabilitiesForm } from "./common/CapabilitiesForm";
import { ContactsForm } from "./common/ContactsForm";
import { AccountForm } from "./common/AccountForm";
import { ProfileForm } from "./common/ProfileForm";
import { FormMessage } from "../components/FormMessage.jsx";

import { SubmitButton } from "../components/SubmitButton.jsx";
import { BackButton } from "../components/BackButton.jsx";
import { StyledTab } from "../components/StyledTab.jsx";
import { TabPanel } from "../components/TabPanel.jsx";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Tabs, Grid } from "@material-ui/core";

const ConnectedAddNewUser = ({
  history,
  location,

  getTemporaryUserDataWithDatabase,
  removeTemporaryUserData,
  setTemporaryUserData,

  setContactsAsSubmitted,
  setProfileAsSubmitted,
  setAccountAsSubmitted,

  addUserToList,

  contactsIsSubmitted,
  profileIsSubmitted,
  accountIsSubmitted,

  temporaryUserData,

  databaseHasUserData
}) => {
  const classes = useStyles();

  const [tabIndex, setTabIndex] = useState(0);

  const [visible, setVisible] = useState(false);

  const [disabledTabs, setDisabledTabs] = useState({
    capabilitiesTab: true,
    contactsTab: true,
    profileTab: true
  });

  useEffect(() => {
    const queryTab = getQueryStringValue("tab", location.search);

    setTabIndex(getTabValueByKey(queryTab));
  }, [location.search]);

  useEffect(() => {
    history.push({ search: "?tab=account" });
    // eslint-disable-next-line
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleChange = (event, value) => {
    setQueryString("tab", getTabKeyByValue(value));
  };

  const [saveChangeToRedux] = useDebouncedCallback((formikValues, userData) => {
    if (!isEqual(formikValues, userData)) {
      setTemporaryUserData(formikValues);
    }
  }, 250);

  const getButtons = (getBackButton, getFinishButton) => {
    return (
      <>
        {getBackButton ? (
          <Grid container justify="space-between">
            <BackButton />
            <SubmitButton finish={getFinishButton} />
          </Grid>
        ) : (
          <SubmitButton />
        )}
      </>
    );
  };

  const capabilitiesHandleSubmit = () => {
    addUserToList(temporaryUserData);

    const history = createHashHistory();
    history.push("/users");

    setDisabledTabs({
      capabilitiesTab: true,
      contactsTab: true,
      profileTab: true
    });

    removeTemporaryUserData();
  };

  const accountData = lodashPick(
    temporaryUserData,
    Object.keys(fields.account)
  );
  const profileData = lodashPick(
    temporaryUserData,
    Object.keys(fields.profile)
  );
  const contactsData = lodashPick(
    temporaryUserData,
    Object.keys(fields.contacts)
  );
  const capabilitiesData = lodashPick(
    temporaryUserData,
    Object.keys(fields.capabilities)
  );

  useEffect(() => {
    checkObjectPropsIsNotEmpty(profileData) &&
      setDisabledTabs(prevState => ({ ...prevState, profileTab: false }));

    checkObjectPropsIsNotEmpty(contactsData) &&
      setDisabledTabs(prevState => ({ ...prevState, contactsTab: false }));

    checkObjectPropsIsNotEmpty(capabilitiesData) &&
      setDisabledTabs(prevState => ({ ...prevState, capabilitiesTab: false }));

    // eslint-disable-next-line
  }, [temporaryUserData]);

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
        value={tabIndex}>
        <StyledTab label="1. Account" {...a11yProps(0)} />

        <StyledTab
          disabled={disabledTabs.profileTab}
          label="2. Profile"
          {...a11yProps(1)}
        />

        <StyledTab
          disabled={disabledTabs.contactsTab}
          label="3. Contacts"
          {...a11yProps(2)}
        />

        <StyledTab
          disabled={disabledTabs.capabilitiesTab}
          label="4. Capabilities"
          {...a11yProps(3)}
        />
      </Tabs>

      {databaseHasUserData && (
        <FormMessage
          getTemporaryUserDataWithDatabase={getTemporaryUserDataWithDatabase}
          removeTemporaryUserData={removeTemporaryUserData}
        />
      )}

      <TabPanel value={tabIndex} index={0}>
        <AccountForm
          saveChangeToRedux={saveChangeToRedux}
          accountData={accountData}
          getButtons={getButtons}
          visible={visible}
          toggleVisibility={toggleVisibility}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              profileTab: false
            }));
            setQueryString("tab", "profile");
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ProfileForm
          saveChangeToRedux={saveChangeToRedux}
          profileData={profileData}
          getButtons={getButtons}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              contactsTab: false
            }));
            setQueryString("tab", "contacts");
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <ContactsForm
          saveChangeToRedux={saveChangeToRedux}
          contactsData={contactsData}
          getButtons={getButtons}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              capabilitiesTab: false
            }));
            setQueryString("tab", "capabilities");
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <CapabilitiesForm
          saveChangeToRedux={saveChangeToRedux}
          capabilitiesData={capabilitiesData}
          userData={temporaryUserData}
          getButtons={getButtons}
          handleSubmit={() => capabilitiesHandleSubmit()}
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

export const AddNewUser = connect(
  ({
    submitted: {
      contactsIsSubmitted,
      profileIsSubmitted,
      accountIsSubmitted,

      databaseHasUserData
    },
    temporaryUserData
  }) => ({
    contactsIsSubmitted,
    profileIsSubmitted,
    accountIsSubmitted,

    databaseHasUserData,

    temporaryUserData
  }),
  {
    getTemporaryUserDataWithDatabase,
    removeTemporaryUserData,
    setTemporaryUserData,

    addUserToList
  }
)(ConnectedAddNewUser);
