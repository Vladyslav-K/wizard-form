import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEqual from "lodash.isequal";
import lodashPick from "lodash.pick";

import { useDebouncedCallback } from "use-debounce";

// helpers functions
import {
  getQueryStringValue,
  setQueryString,
  getTabKeyByValue,
  getTabValueByKey
} from "../utils/helpers.js";

import { fields } from "../utils/constants.js";

// store current user actions
import {
  saveCurrentUser,
  setCurrentUserData,
  getUserFromList
} from "../store/currentUserModule.js";

// tab forms
import { CapabilitiesForm } from "./common/CapabilitiesForm";
import { ContactsForm } from "./common/ContactsForm";
import { ProfileForm } from "./common/ProfileForm";
import { AccountForm } from "./common/AccountForm";

// separate components
import { SaveButton } from "../components/SaveButton.jsx";
import { StyledTab } from "../components/StyledTab.jsx";
import { TabPanel } from "../components/TabPanel.jsx";

// icon
import { ReactComponent as ArrowIcon } from "../images/icons/Rectangle.svg";

import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  IconButton,
  Container,
  Button,
  Tabs,
  Grid
} from "@material-ui/core";

const ConnectedEditing = ({
  saveCurrentUser,
  setCurrentUserData,
  getUserFromList,
  isLoading,
  userData,
  userList,

  location,
  history,
  match
}) => {
  const classes = useStyles({ isLoading });

  const [tabIndex, setTabIndex] = useState(0);

  const [visible, setVisible] = useState(false);

  const [open, setOpen] = React.useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const queryTab = getQueryStringValue({
      queryName: "tab",
      location: location.search
    });

    setTabIndex(getTabValueByKey(queryTab));
  }, [location.search]);

  useEffect(() => {
    const queryTab = getQueryStringValue({
      queryName: "tab",
      location: location.search
    });

    if (!queryTab) {
      setQueryString({ queryName: "tab", queryValue: "account" });
    }

    getUserFromList({ id: +match.params.id });
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, value) => {
    setQueryString({ queryName: "tab", queryValue: getTabKeyByValue(value) });
  };

  const [saveChangeToRedux] = useDebouncedCallback((formikValues, userData) => {
    if (!isEqual(formikValues, userData)) {
      setCurrentUserData(formikValues);
    }
  }, 250);

  const handleSubmit = () => {
    saveCurrentUser({ userData: userData, id: +match.params.id });
    setOpen(true);
  };

  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getButtons = () => {
    return <SaveButton handleMessageClose={handleMessageClose} open={open} />;
  };

  const handleClick = () => {
    history.push({ pathname: `/users/view/${+match.params.id}` });
  };

  const accountData = lodashPick(userData, Object.keys(fields.account));
  const profileData = lodashPick(userData, Object.keys(fields.profile));
  const contactsData = lodashPick(userData, Object.keys(fields.contacts));
  const capabilitiesData = lodashPick(
    userData,
    Object.keys(fields.capabilities)
  );

  return (
    <>
      {isLoading && (
        <Grid container justify="center" className={classes.circularContainer}>
          <CircularProgress className={classes.circular} size="8%" />
        </Grid>
      )}
      <Container maxWidth="md" className={classes.mainContainer}>
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
            initialData={accountData}
            getButtons={getButtons}
            visible={visible}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ProfileForm
            saveChangeToRedux={saveChangeToRedux}
            handleSubmit={handleSubmit}
            initialData={profileData}
            getButtons={getButtons}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <ContactsForm
            saveChangeToRedux={saveChangeToRedux}
            handleSubmit={handleSubmit}
            initialData={contactsData}
            getButtons={getButtons}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <CapabilitiesForm
            saveChangeToRedux={saveChangeToRedux}
            initialData={capabilitiesData}
            handleSubmit={handleSubmit}
            getButtons={getButtons}
          />
        </TabPanel>
      </Container>
    </>
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

export const Editing = connect(
  state => ({
    userData: state.currentUserData.userData,
    userList: state.listOfUsers.userList,
    isLoading: state.UIModule.isLoading
  }),
  {
    saveCurrentUser,
    setCurrentUserData,
    getUserFromList
  }
)(ConnectedEditing);
