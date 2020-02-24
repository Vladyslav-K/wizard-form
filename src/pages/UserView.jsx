import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { connect } from "react-redux";

import { getUserFromList } from "../domain/currentUserDomain/currentUserActions.js";

import { ReactComponent as ArrowIcon } from "../images/icons/Rectangle.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button, Container, Grid, Avatar } from "@material-ui/core";

const ConnectedUserView = ({
  getUserFromList,
  currentUserData,
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
  } = currentUserData;

  useEffect(() => {
    getUserFromList({ id: +match.params.id });
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    history.push({ pathname: "/users" });
  };

  return (
    <Container maxWidth="md">
      <Grid container justify="center">
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
            {username}
          </Grid>
        </Grid>

        <Grid container item xs={10} direction="row" justify="space-around">
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
              <Grid item xs={2}>
                <span> Account </span>
              </Grid>

              <Grid direction="column" container item xs={2}>
                <Grid container direction="column" item xs>
                  <span> User name: </span>

                  <span> Password: </span>
                </Grid>
              </Grid>

              <Grid
                className={classes.content}
                direction="column"
                container
                xs={4}
                item>
                <Grid container direction="column" item xs>
                  <span>{username}</span>

                  <span>{password}</span>
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
              <Grid item xs={2}>
                <span> Personal </span>
              </Grid>

              <Grid direction="column" container item xs={2}>
                <Grid container direction="column" item xs>
                  <span> First name: </span>

                  <span> Last name: </span>

                  <span> Birth date: </span>

                  <span> Email: </span>

                  <span> Adress: </span>

                  {gender && <span> Gender: </span>}
                </Grid>
              </Grid>

              <Grid
                className={classes.content}
                direction="column"
                container
                xs={4}
                item>
                <Grid container direction="column" item xs>
                  <span>{firstName}</span>

                  <span>{lastName}</span>

                  <span>
                    {DateTime.fromJSDate(birthDate).toFormat("dd.LL.yyyy")}
                  </span>

                  <span> {email} </span>

                  <span> {address} </span>

                  {gender && <span> {gender} </span>}
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
              <Grid item xs={2}>
                <span> Contacts </span>
              </Grid>

              <Grid direction="column" container item xs={2}>
                <Grid container direction="column" item xs>
                  {phones[0] && <span> Phone #1: </span>}

                  {phones[1] && <span> Phone #2: </span>}

                  {phones[2] && <span> Phone #3: </span>}

                  <span> Fax: </span>

                  {company && <span> Company: </span>}

                  <span> Github link: </span>

                  <span> Facebook link: </span>

                  <span> Main language: </span>
                </Grid>
              </Grid>

              <Grid
                className={classes.content}
                direction="column"
                container
                xs={4}
                item>
                <Grid container direction="column" item xs>
                  {phones[0] && <span> {phones[0]} </span>}

                  {phones[1] && <span> {phones[1]} </span>}

                  {phones[2] && <span> {phones[2]} </span>}

                  <span>{fax}</span>

                  {company && <span>{company}</span>}

                  <span> {gitHubLink} </span>

                  <span> {facebookLink} </span>

                  <span> {mainLanguage} </span>
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
              <Grid item xs={2}>
                <span> Cababilities </span>
              </Grid>

              <Grid direction="column" container item xs={2}>
                <Grid container direction="column" item xs>
                  <span> Skills: </span>

                  {additionalInformation && (
                    <span> Additional information: </span>
                  )}

                  {hobbies.lenght > 0 && <span> My hobbies: </span>}
                </Grid>
              </Grid>

              <Grid
                className={classes.content}
                direction="column"
                container
                xs={4}
                item>
                <Grid container direction="column" item xs>
                  <span> {String(skills.map(skill => " " + skill))} </span>

                  {additionalInformation && (
                    <span>{additionalInformation}</span>
                  )}

                  {hobbies && <span>{hobbies}</span>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    margin: "15px"
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
    lineHeight: "16px",

    "& span": {
      marginBottom: "16px"
    }
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
  }
}));

export const UserView = connect(
  ({ currentUserData, listOfUsers: { userList } }) => ({
    currentUserData,
    userList
  }),
  { getUserFromList }
)(ConnectedUserView);
