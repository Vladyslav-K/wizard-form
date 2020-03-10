import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// helpers functions
import {
  separationOfFormValues,
  getQueryStringValue,
  setQueryString,
  getTabKeyByValue,
  getTabValueByKey
} from "../utils/helpers.js";

// store current user actions
import {
  setCurrentUserData,
  saveCurrentUser,
  getUserFromList
} from "../store/currentUserModule.js";

// tab forms
import CapabilitiesForm from "./common/CapabilitiesForm";
import ContactsForm from "./common/ContactsForm";
import ProfileForm from "./common/ProfileForm";
import AccountForm from "./common/AccountForm";

// separate components
import { SaveButton } from "../components/SaveButton.jsx";
import { StyledTab } from "../components/StyledTab.jsx";
import { TabPanel } from "../components/TabPanel.jsx";

// arrow icon for link
import { ReactComponent as ArrowIcon } from "../images/icons/Rectangle.svg";

// styles
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  IconButton,
  Container,
  Button,
  Tabs,
  Grid
} from "@material-ui/core";

const Editing = ({
  setCurrentUserData,
  saveCurrentUser,
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

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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

  const tabsHandleChange = (event, value) => {
    setQueryString({ queryName: "tab", queryValue: getTabKeyByValue(value) });
  };

  const saveUserData = value => {
    setCurrentUserData(value);
  };

  const handleSubmit = () => {
    saveCurrentUser({ userData: userData, id: +match.params.id });
    setOpenSnackbar(true);
  };

  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const getButtons = ({ errors, ...other }) => {
    return (
      <SaveButton
        handleMessageClose={handleMessageClose}
        openSnackbar={openSnackbar}
        errors={errors}
      />
    );
  };

  const handleClick = () => {
    history.push({ pathname: `/users/view/${+match.params.id}` });
  };

  const {
    accountData,
    profileData,
    contactsData,
    capabilitiesData
  } = separationOfFormValues(userData);

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
          classes={{ indicator: classes.tabIndicator }}
          onChange={tabsHandleChange}
          aria-label="Registration"
          variant="fullWidth"
          value={tabIndex}>
          <StyledTab label="1. Account" {...a11yProps(0)} />

          <StyledTab label="2. Profile" {...a11yProps(1)} />

          <StyledTab label="3. Contacts" {...a11yProps(2)} />

          <StyledTab label="4. Capabilities" {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <AccountForm
            toggleVisibility={() => setVisible(!visible)}
            handleSubmit={handleSubmit}
            initialData={accountData}
            saveUserData={saveUserData}
            getButtons={getButtons}
            visible={visible}
          />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <ProfileForm
            handleSubmit={handleSubmit}
            initialData={profileData}
            saveUserData={saveUserData}
            getButtons={getButtons}
          />
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <ContactsForm
            handleSubmit={handleSubmit}
            initialData={contactsData}
            saveUserData={saveUserData}
            getButtons={getButtons}
          />
        </TabPanel>

        <TabPanel value={tabIndex} index={3}>
          <CapabilitiesForm
            initialData={capabilitiesData}
            handleSubmit={handleSubmit}
            saveUserData={saveUserData}
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

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "41px",
    color: "#475666",
    fontSize: "35px"
  },

  linkToUsers: {
    justifyContent: "center",

    margin: "3rem 0",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "#9BB0CB",
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
    userData: state.currentUserData.userData,
    userList: state.listOfUsers.userList,
    isLoading: state.UIModule.isLoading
  }),
  {
    saveCurrentUser,
    setCurrentUserData,
    getUserFromList
  }
)(Editing);
