import React, { useState, useEffect } from "react";
import { createHashHistory } from "history";
import { connect } from "react-redux";

import { useDebouncedCallback } from "use-debounce";

import { getQueryStringIndex, setQueryStringIndex } from "../utils/helpers.js";

import {
  getTemporaryUserDataWithDatabase,
  removeTemporaryUserData,
  setTemporaryUserData
} from "../domain/temporaryUserDomain/temporaryUserActions.js";

import {
  setContactsAsSubmitted,
  setProfileAsSubmitted,
  setAccountAsSubmitted
} from "../domain/submittedFormsDomain/submittedFormsActions.js";

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

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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

  const [saveChangeToRedux] = useDebouncedCallback((formikValues, userData) => {
    const isEqual = require("lodash.isequal");

    if (!isEqual(formikValues, userData)) {
      setTemporaryUserData(formikValues);
    }
  }, 250);

  const goToStep = queryStringIndex => {
    queryStringIndex && setQueryStringIndex("step", queryStringIndex);
  };

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
          userData={temporaryUserData}
          getButtons={getButtons}
          visible={visible}
          toggleVisibility={toggleVisibility}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              profileTab: false
            }));
            goToStep(1);
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ProfileForm
          saveChangeToRedux={saveChangeToRedux}
          userData={temporaryUserData}
          getButtons={getButtons}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              contactsTab: false
            }));
            goToStep(2);
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <ContactsForm
          saveChangeToRedux={saveChangeToRedux}
          userData={temporaryUserData}
          getButtons={getButtons}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              capabilitiesTab: false
            }));
            goToStep(3);
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <CapabilitiesForm
          saveChangeToRedux={saveChangeToRedux}
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

    setContactsAsSubmitted,
    setProfileAsSubmitted,
    setAccountAsSubmitted,

    addUserToList
  }
)(ConnectedAddNewUser);
