import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEqual from "lodash.isequal";
import lodashPick from "lodash.pick";

import { useDebouncedCallback } from "use-debounce";

// helpers functions
import {
  checkDataInTabsAfterReload,
  getQueryStringValue,
  getTabKeyByValue,
  getTabValueByKey,
  setQueryString
} from "../utils/helpers.js";

// constants
import { fields } from "../utils/constants.js";

// store temporary user actions
import {
  syncTemporaryUserDataWithDB,
  setTemporaryUserData,
  deleteTemporaryUser
} from "../store/temporaryUserModule.js";

// store user list actions
import { addUserToList } from "../store/userListModule.js";

// tab forms
import { CapabilitiesForm } from "./common/CapabilitiesForm";
import { ContactsForm } from "./common/ContactsForm";
import { AccountForm } from "./common/AccountForm";
import { ProfileForm } from "./common/ProfileForm";

// separate components
import { SubmitButton } from "../components/SubmitButton.jsx";
import { FormMessage } from "../components/FormMessage.jsx";
import { BackButton } from "../components/BackButton.jsx";
import { StyledTab } from "../components/StyledTab.jsx";
import { TabPanel } from "../components/TabPanel.jsx";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Tabs, Grid, CircularProgress } from "@material-ui/core";

const ConnectedAddNewUser = ({
  syncTemporaryUserDataWithDB,
  setTemporaryUserData,
  deleteTemporaryUser,
  databaseHasUserData,

  addUserToList,

  userData,
  isLoading,

  location,
  history
}) => {
  const classes = useStyles({ isLoading });

  const [tabIndex, setTabIndex] = useState(0);

  const [visible, setVisible] = useState(false);

  const [disabledTabs, setDisabledTabs] = useState({
    capabilitiesTab: true,
    contactsTab: true,
    profileTab: true
  });

  useEffect(() => {
    const queryTab = getQueryStringValue({
      queryName: "tab",
      location: location.search
    });

    setTabIndex(getTabValueByKey(queryTab));
  }, [location.search]);

  useEffect(() => {
    setQueryString({ queryName: "tab", queryValue: "account" });
    // eslint-disable-next-line
  }, []);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleChange = (event, value) => {
    setQueryString({ queryName: "tab", queryValue: getTabKeyByValue(value) });
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
    addUserToList(userData);

    setQueryString({ queryName: "page", queryValue: "1", pathname: "/users" });

    setDisabledTabs({
      capabilitiesTab: true,
      contactsTab: true,
      profileTab: true
    });
  };

  const accountData = lodashPick(userData, Object.keys(fields.account));
  const profileData = lodashPick(userData, Object.keys(fields.profile));
  const contactsData = lodashPick(userData, Object.keys(fields.contacts));
  const capabilitiesData = lodashPick(
    userData,
    Object.keys(fields.capabilities)
  );

  useEffect(() => {
    checkDataInTabsAfterReload({
      setDisabledTabs,
      setTabIndex,
      capabilitiesData,
      contactsData,
      profileData
    });

    // eslint-disable-next-line
  }, [userData]);

  return (
    <Container maxWidth="md">
      <Grid className={classes.heading} container justify="center">
        Adding new user
      </Grid>
      <Tabs
        classes={{ indicator: classes.tabIncticator }}
        className={classes.mainContainer}
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
          syncTemporaryUserDataWithDB={syncTemporaryUserDataWithDB}
          deleteTemporaryUser={deleteTemporaryUser}
        />
      )}

      {isLoading && (
        <Grid container justify="center" className={classes.circularContainer}>
          <CircularProgress className={classes.circular} size="8%" />
        </Grid>
      )}

      <TabPanel value={tabIndex} index={0}>
        <AccountForm
          saveChangeToRedux={saveChangeToRedux}
          initialData={accountData}
          getButtons={getButtons}
          visible={visible}
          toggleVisibility={toggleVisibility}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              profileTab: false
            }));
            setQueryString({ queryName: "tab", queryValue: "profile" });
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ProfileForm
          saveChangeToRedux={saveChangeToRedux}
          initialData={profileData}
          getButtons={getButtons}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              contactsTab: false
            }));
            setQueryString({ queryName: "tab", queryValue: "contacts" });
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <ContactsForm
          saveChangeToRedux={saveChangeToRedux}
          initialData={contactsData}
          getButtons={getButtons}
          handleSubmit={() => {
            setDisabledTabs(prevState => ({
              ...prevState,
              capabilitiesTab: false
            }));
            setQueryString({ queryName: "tab", queryValue: "capabilities" });
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <CapabilitiesForm
          saveChangeToRedux={saveChangeToRedux}
          initialData={capabilitiesData}
          userData={userData}
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
  mainContainer: {
    filter: props => (props.isLoading ? "blur(4px)" : "none")
  },

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
  },

  circularContainer: {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%"
  },

  circular: {
    color: "#4E86E4"
  }
}));

export const AddNewUser = connect(
  state => ({
    databaseHasUserData: state.temporaryUserData.databaseHasUserData,
    isLoading: state.temporaryUserData.isLoading,
    userData: state.temporaryUserData.userData
  }),
  {
    syncTemporaryUserDataWithDB,
    setTemporaryUserData,
    deleteTemporaryUser,

    addUserToList
  }
)(ConnectedAddNewUser);
