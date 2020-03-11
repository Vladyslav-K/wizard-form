import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// helpers functions
import {
  separationOfFormValues,
  getQueryStringValue,
  getTabKeyByValue,
  getTabValueByKey,
  setQueryString
} from "../utils/helpers.js";

// store temporary user actions
import {
  syncTemporaryUserDataWithDB,
  deleteTemporaryUser,
  checkTemporaryUser,
  setTemporaryUser,
  setDisabledTabs
} from "../store/temporaryUserModule.js";

// store user list actions
import { addUserToList } from "../store/userListModule.js";

// tab forms
import CapabilitiesForm from "./common/CapabilitiesForm";
import ContactsForm from "./common/ContactsForm";
import AccountForm from "./common/AccountForm";
import ProfileForm from "./common/ProfileForm";

// components
import { SubmitButton } from "../components/SubmitButton.jsx";
import { FormMessage } from "../components/FormMessage.jsx";
import { BackButton } from "../components/BackButton.jsx";
import { StyledTab } from "../components/StyledTab.jsx";
import { TabPanel } from "../components/TabPanel.jsx";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { Container, Tabs, Grid, CircularProgress } from "@material-ui/core";

const AddNewUser = ({
  syncTemporaryUserDataWithDB,
  checkTemporaryUser,
  setTemporaryUser,
  deleteTemporaryUser,
  databaseHasUserData,
  setDisabledTabs,
  addUserToList,

  disabledTabs,
  isLoading,
  user,

  location,
  history
}) => {
  const classes = useStyles({ isLoading });

  const [tabIndex, setTabIndex] = useState(0);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const queryTab = getQueryStringValue({
      queryName: "tab",
      location: location.search
    });

    setTabIndex(getTabValueByKey(queryTab));
  }, [location.search]);

  useEffect(() => {
    checkTemporaryUser();

    setQueryString({ queryName: "tab", queryValue: "account" });
    // eslint-disable-next-line
  }, []);

  const tabsHandleChange = (event, value) => {
    setQueryString({ queryName: "tab", queryValue: getTabKeyByValue(value) });
  };

  const saveUser = value => {
    setTemporaryUser(value);
  };

  const getButtons = ({ backButton, finishButton }) => {
    return (
      <>
        {backButton ? (
          <Grid container justify="space-between">
            <BackButton />
            <SubmitButton finish={finishButton} />
          </Grid>
        ) : (
          <SubmitButton />
        )}
      </>
    );
  };

  const capabilitiesHandleSubmit = () => {
    addUserToList(user);

    setQueryString({ queryName: "page", queryValue: "1", pathname: "/users" });

    deleteTemporaryUser();
  };

  const {
    accountData,
    profileData,
    contactsData,
    capabilitiesData
  } = separationOfFormValues(user);

  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <Grid className={classes.heading} container justify="center">
        Adding new user
      </Grid>

      <Tabs
        classes={{ indicator: classes.tabIndicator }}
        onChange={tabsHandleChange}
        aria-label="Registration"
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
          initialData={accountData}
          visible={visible}
          toggleVisibility={() => setVisible(!visible)}
          getButtons={getButtons}
          saveUser={saveUser}
          handleSubmit={() => {
            setDisabledTabs({ profileTab: false });

            setQueryString({ queryName: "tab", queryValue: "profile" });
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ProfileForm
          initialData={profileData}
          getButtons={getButtons}
          saveUser={saveUser}
          handleSubmit={() => {
            setDisabledTabs({ contactsTab: false });

            setQueryString({ queryName: "tab", queryValue: "contacts" });
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <ContactsForm
          initialData={contactsData}
          getButtons={getButtons}
          saveUser={saveUser}
          handleSubmit={() => {
            setDisabledTabs({ capabilitiesTab: false });

            setQueryString({ queryName: "tab", queryValue: "capabilities" });
          }}
        />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <CapabilitiesForm
          initialData={capabilitiesData}
          user={user}
          handleSubmit={capabilitiesHandleSubmit}
          getButtons={getButtons}
          saveUser={saveUser}
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

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "41px",
    color: "#475666",
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
      lineHeight: "16px",
      fontSize: "14px",
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

  tabIndicator: {
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

export default connect(
  state => ({
    databaseHasUserData: state.temporaryUser.databaseHasUserData,
    disabledTabs: state.temporaryUser.disabledTabs,
    isLoading: state.temporaryUser.isLoading,
    user: state.temporaryUser.user
  }),
  {
    syncTemporaryUserDataWithDB,
    deleteTemporaryUser,
    checkTemporaryUser,
    setTemporaryUser,
    setDisabledTabs,
    addUserToList
  }
)(AddNewUser);
