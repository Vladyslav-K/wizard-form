import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { syncAccountDataWithDatabase } from "../domain/accountFormDomain/accountFormActions";
import { syncProfileDataWithDatabase } from "../domain/profileFormDomain/profileFormActions";
import database from "../utils/database";

import { ReactComponent as CloseIcon } from "../images/icons/Close.svg";
import CapabilitiesForm from "./common/CapabilitiesForm";
import ContactsForm from "./common/ContactsForm";
import AccountForm from "./common/AccountForm";
import ProfileForm from "./common/ProfileForm";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
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
    padding: "20px",

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

function AddNewUser({
  account,
  syncAccountDataWithDatabase,
  syncProfileDataWithDatabase
}) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [queryVisible, setQueryVisible] = useState(false);

  useEffect(() => {
    database.accountData.get(1, data => {
      if (
        data &&
        (data.passwordConfirmation ||
          data.password ||
          data.username ||
          data.avatar)
      ) {
        setQueryVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    for (let key in account) {
      if (account[key]) {
        setQueryVisible(false);
      }
    }
  }, [account]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hideQueryAndClearDatabase = () => {
    database.accountData.delete(1);

    setQueryVisible(false);
  };

  const syncDataWithDatabase = () => {
    database.accountData.get(1, data => {
      syncAccountDataWithDatabase(data);
    });

    database.profileData.get(1, data => {
      syncProfileDataWithDatabase(data);
    });

    setQueryVisible(false);
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

      {queryVisible && (
        <div className={classes.queryContainer}>
          <div>
            <span className={classes.queryText}>
              You have an unsaved user data. Do you want to complete it?
            </span>
            <Button
              className={classes.queryButton}
              onClick={syncDataWithDatabase}
            >
              Continue
            </Button>
          </div>

          <IconButton onClick={hideQueryAndClearDatabase}>
            <CloseIcon />
          </IconButton>
        </div>
      )}

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

const mapStateToProps = ({ account }) => {
  return { account };
};

export default connect(mapStateToProps, {
  syncAccountDataWithDatabase,
  syncProfileDataWithDatabase
})(AddNewUser);
