import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { connect } from "react-redux";

import { getUserFromList } from "../domain/currentUserDomain/currentUserActions.js";

import { updateUserListFromDB } from "../domain/userListDomain/userListActions.js";

import { getTabKeyByValue, setQueryString } from "../utils/helpers.js";

import {
  CAPABILITIES_TAB_INDEX,
  CONTACTS_TAB_INDEX,
  PROFILE_TAB_INDEX,
  ACCOUNT_TAB_INDEX
} from "../utils/constants.js";

import { ReactComponent as EditIcon } from "../images/icons/Edit2.svg";
import { ReactComponent as ArrowIcon } from "../images/icons/Rectangle.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";

import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  IconButton,
  Container,
  Avatar,
  Button,
  Grid
} from "@material-ui/core";

const ConnectedUserView = ({
  updateUserListFromDB,
  getUserFromList,
  isLoading,
  userData,
  userList,
  history,
  match
}) => {
  const classes = useStyles();

  const {
    password,
    username,
    avatar,

    firstName,
    birthDate,
    lastName,
    address,
    gender,
    email,

    mainLanguage,
    facebookLink,
    gitHubLink,
    company,
    phones,
    fax,

    additionalInformation,
    hobbies,
    skills
  } = userData;

  useEffect(() => {
    getUserFromList({ id: +match.params.id });
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    history.push({ pathname: "/users" });
  };

  const linkHandleClick = value => {
    setQueryString({
      queryName: "tab",
      queryValue: getTabKeyByValue(value),
      pathname: `/users/edit/${+match.params.id}`
    });
  };

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Grid container justify="center" className={classes.circularContainer}>
          <CircularProgress className={classes.circular} size="8%" />
        </Grid>
      ) : (
        <Grid container justify="center">
          <Grid container justify="space-between">
            <Grid item xs={3}>
              <IconButton onClick={handleClick}>
                <ArrowIcon />
              </IconButton>

              <Button className={classes.linkToUsers} onClick={handleClick}>
                Users List
              </Button>
            </Grid>
            <Grid className={classes.heading} item xs={7}>
              {username}
            </Grid>
          </Grid>

          <Grid container item xs={10} direction="row" justify="space-between">
            <Grid item>
              {avatar ? (
                <Avatar
                  className={classes.userAvatar}
                  alt="User avatar"
                  src={avatar}
                />
              ) : (
                <Avatar
                  className={classes.defaultAvatar}
                  alt="Default avatar image"
                  src={DefaultAvatarImage}
                />
              )}
            </Grid>

            <Grid
              className={classes.headers}
              justify="space-around"
              container
              xs={8}
              item>
              <Grid
                className={classes.container}
                justify="space-around"
                direction="row"
                container
                xs={12}
                item>
                <Grid item xs={3}>
                  <Grid container direction="row">
                    <span> Account </span>
                    <IconButton
                      className={classes.editIcon}
                      onClick={() => linkHandleClick(ACCOUNT_TAB_INDEX)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid container item xs={9}>
                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> User name: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {username} </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Password: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {password.replace(/./gm, "*")} </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                className={classes.container}
                justify="space-around"
                direction="row"
                container
                xs={12}
                item>
                <Grid item xs={3}>
                  <Grid container direction="row">
                    <span> Personal </span>
                    <IconButton
                      className={classes.editIcon}
                      onClick={() => linkHandleClick(PROFILE_TAB_INDEX)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid container item xs={9}>
                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> First name: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {firstName} </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Last name: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {lastName} </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Birth date: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span>
                        {DateTime.fromJSDate(birthDate).toFormat("dd.LL.yyyy")}
                      </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Email: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {email} </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Address: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {address} </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Gender: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {gender} </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                className={classes.container}
                justify="space-around"
                direction="row"
                container
                xs={12}
                item>
                <Grid item xs={3}>
                  <Grid container direction="row">
                    <span> Contacts </span>
                    <IconButton
                      className={classes.editIcon}
                      onClick={() => linkHandleClick(CONTACTS_TAB_INDEX)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid container item xs={9}>
                  {phones[0] && (
                    <Grid
                      className={classes.container}
                      justify="space-between"
                      direction="row"
                      container
                      xs={12}
                      item>
                      <Grid item xs={6}>
                        <span> Phone#1 </span>
                      </Grid>

                      <Grid className={classes.content} item xs={6}>
                        <span> {phones[0]} </span>
                      </Grid>
                    </Grid>
                  )}

                  {phones[1] && (
                    <Grid
                      className={classes.container}
                      justify="space-between"
                      direction="row"
                      container
                      xs={12}
                      item>
                      <Grid item xs={6}>
                        <span> Phone#1 </span>
                      </Grid>

                      <Grid className={classes.content} item xs={6}>
                        <span> {phones[1]} </span>
                      </Grid>
                    </Grid>
                  )}

                  {phones[2] && (
                    <Grid
                      className={classes.container}
                      justify="space-between"
                      direction="row"
                      container
                      xs={12}
                      item>
                      <Grid item xs={6}>
                        <span> Phone#1 </span>
                      </Grid>

                      <Grid className={classes.content} item xs={6}>
                        <span> {phones[2]} </span>
                      </Grid>
                    </Grid>
                  )}

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Fax: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {fax} </span>
                    </Grid>
                  </Grid>

                  {company && (
                    <Grid
                      className={classes.container}
                      justify="space-between"
                      direction="row"
                      container
                      xs={12}
                      item>
                      <Grid item xs={6}>
                        <span> Company: </span>
                      </Grid>

                      <Grid className={classes.content} item xs={6}>
                        <span>{company}</span>
                      </Grid>
                    </Grid>
                  )}

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Github link: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {gitHubLink} </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Facebook link: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {facebookLink} </span>
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Main language: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {mainLanguage} </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                className={classes.container}
                justify="space-around"
                direction="row"
                container
                xs={12}
                item>
                <Grid item xs={3}>
                  <Grid container direction="row">
                    <span> Capabilities </span>
                    <IconButton
                      className={classes.editIcon}
                      onClick={() => linkHandleClick(CAPABILITIES_TAB_INDEX)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid container item xs={9}>
                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item>
                    <Grid item xs={6}>
                      <span> Skills: </span>
                    </Grid>

                    <Grid className={classes.content} item xs={6}>
                      <span> {String(skills.map(skill => " " + skill))} </span>
                    </Grid>
                  </Grid>

                  {additionalInformation && (
                    <Grid
                      className={classes.container}
                      justify="space-between"
                      direction="row"
                      container
                      xs={12}
                      item>
                      <Grid item xs={6}>
                        <span> Additional information: </span>
                      </Grid>

                      <Grid className={classes.content} item xs={6}>
                        <span> {additionalInformation} </span>
                      </Grid>
                    </Grid>
                  )}

                  {hobbies && (
                    <Grid
                      className={classes.container}
                      justify="space-between"
                      direction="row"
                      container
                      xs={12}
                      item>
                      <Grid item xs={6}>
                        <span> Hobbies: </span>
                      </Grid>

                      <Grid className={classes.content} item xs={6}>
                        <span> {hobbies} </span>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: "20px"
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

  content: {
    color: "#657C9A",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "16px",

    "& span": {
      marginBottom: "16px"
    }
  },

  headers: {
    color: "#475666",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
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

  defaultAvatar: {
    width: "200px",
    height: "200px",

    border: "3px solid #5E97F3",

    "& img": {
      height: "90%",
      width: "auto",

      transform: "translateY(10px)"
    }
  },

  userAvatar: {
    width: "200px",
    height: "200px",

    border: "3px solid #5E97F3",

    "& img": {
      width: "auto"
    }
  },

  editIcon: {
    padding: 0,
    margin: "0px 0px 0px 12px"
  },

  circularContainer: {
    marginTop: "35vh"
  },

  circular: {
    color: "#4E86E4"
  }
}));

export const UserView = connect(
  ({
    currentUserData: { isLoading, userData },
    listOfUsers: { userList }
  }) => ({
    isLoading,
    userData,
    userList
  }),
  { updateUserListFromDB, getUserFromList }
)(ConnectedUserView);
