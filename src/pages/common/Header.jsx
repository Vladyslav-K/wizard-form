import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ListOfUsersIcon } from "../../images/icons/list-of-users.svg";
import { ReactComponent as AddNewUserIcon } from "../../images/icons/add-new-user.svg";
import { ReactComponent as LogoIcon } from "../../images/icons/Logo.svg";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  grow: {
    flexGrow: 1
  },

  appBarContainer: {
    padding: "0 18%",

    background:
      "radial-gradient(50% 28800% at 50% 68.33%, #4E86E4 0%, #2F68C8 100%)",
    boxShadow: " 0px 1px 5px #C1CEDE"
  },

  button: {
    padding: "0 30px",
    textTransform: "none"
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBarContainer}>
      <Toolbar>
        <LogoIcon />

        <div className={classes.grow} />

        <Button
          component={Link}
          to="/registration"
          color="inherit"
          className={classes.button}
          startIcon={<AddNewUserIcon />}
        >
          Adding new user
        </Button>

        <Button
          component={Link}
          to="/users"
          color="inherit"
          className={classes.button}
          startIcon={<ListOfUsersIcon />}
        >
          List of users
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
