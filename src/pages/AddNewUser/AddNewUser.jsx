import React, { useState } from "react";

import Capabilities from "../../components/Capabilities";
import Contacts from "../../components/Contacts";
import Account from "../../components/Account";
import Profile from "../../components/Profile";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
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
    minWidth: 72,
    background: "#EAF1FD",

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

      <Paper>
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
      </Paper>

      <TabPanel value={value} index={0}>
        <Account />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Profile />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Contacts />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Capabilities />
      </TabPanel>
    </Container>
  );
}

// import React, { useState } from "react";

// import Capabilities from "../../components/Capabilities";
// import Contacts from "../../components/Contacts";
// import Account from "../../components/Account";
// import Profile from "../../components/Profile";

// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

// const useStyles = makeStyles(theme => ({
//   container: {},

// heading: {
//   padding: "3rem 0",

//   fontFamily: "Roboto",
//   fontStyle: "normal",
//   fontWeight: "bold",
//   lineHeight: "41px",
//   fontSize: "35px"
// }
// }));

// function AddNewUser() {
//   const classes = useStyles();

//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChange

//   return (
// <Container maxWidth="md">
//   <Grid className={classes.heading} container justify="center">
//     Adding new user
//   </Grid>

//       <Tabs
//         value={value}
//         indicatorColor="primary"
//         textColor="primary"
//         onChange={handleChange}
//         aria-label="disabled tabs example"
//       >
//         <Capabilities />
//         <Contacts />
//         <Account />
//         <Profile />
//       </Tabs>
//     </Container>
//   );
// }

// export default AddNewUser;
