import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { connect } from "react-redux";

// store current user actions
import { getUserFromList } from "../store/currentUserModule.js";

// store user list actions
import { updateUser } from "../store/userListModule.js";

// helpers functions
import { getTabKeyByValue, setQueryString } from "../utils/helpers.js";

// constants
import {
  CAPABILITIES_TAB_INDEX,
  CONTACTS_TAB_INDEX,
  PROFILE_TAB_INDEX,
  ACCOUNT_TAB_INDEX
} from "../utils/constants.js";

// icons and default avatar image
import { ReactComponent as EditIcon } from "../images/icons/Edit2.svg";
import { ReactComponent as ArrowIcon } from "../images/icons/Rectangle.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";

// styles
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  IconButton,
  Container,
  Avatar,
  Button,
  Grid,
  Link
} from "@material-ui/core";

const UserView = ({
  getUserFromList,
  updateUser,
  isLoading,
  userData,
  userList,
  history,
  match
}) => {
  const classes = useStyles({ isLoading });

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

  const ListHead = ({ name, tabIndex, children }) => {
    return (
      <Grid
        className={classes.container}
        justify="space-around"
        direction="row"
        container
        xs={12}
        item
      >
        <Grid item xs={3}>
          <Grid container direction="row">
            <span> {name} </span>
            <IconButton
              className={classes.editIcon}
              onClick={() => linkHandleClick(tabIndex)}
            >
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container item xs={9}>
          {children}
        </Grid>
      </Grid>
    );
  };

  const ListRow = ({ name, value }) => {
    return (
      <Grid
        className={classes.container}
        justify="space-between"
        direction="row"
        container
        xs={12}
        item
      >
        <Grid item xs={6}>
          <span> {name} </span>
        </Grid>

        <Grid className={classes.content} item xs={6}>
          <span> {value} </span>
        </Grid>
      </Grid>
    );
  };

  const ListRowLink = ({ name, link }) => {
    return (
      <Grid
        className={classes.container}
        justify="space-between"
        direction="row"
        container
        xs={12}
        item
      >
        <Grid item xs={6}>
          <span> {name}: </span>
        </Grid>

        <Grid className={classes.content} item xs={6}>
          <Link
            href={link}
            color="inherit"
            onClick={event => event.preventDefault()}
          >
            {link}
          </Link>
        </Grid>
      </Grid>
    );
  };

  const HobbiesRow = ({ name, value }) => {
    return (
      <Grid
        className={classes.container}
        justify="space-between"
        direction="row"
        container
        xs={12}
        item
      >
        <Grid item xs={6}>
          <span> {name} </span>
        </Grid>

        <Grid className={classes.hobbies} item xs={6}>
          <span> {value} </span>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      {isLoading && (
        <Grid container justify="center" className={classes.circularContainer}>
          <CircularProgress className={classes.circular} size="8%" />
        </Grid>
      )}

      <Container maxWidth="md" className={classes.mainContainer}>
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
              item
            >
              <ListHead name="Account" tabIndex={ACCOUNT_TAB_INDEX}>
                <ListRow name="User name:" value={username} />

                <ListRow
                  name="Password:"
                  value={password.replace(/./gm, "*")}
                />
              </ListHead>

              <ListHead name="Personal" tabIndex={PROFILE_TAB_INDEX}>
                <ListRow name="First name:" value={firstName} />

                <ListRow name="Last name:" value={lastName} />

                <ListRow
                  name="Birth date:"
                  value={DateTime.fromJSDate(birthDate).toFormat("dd.LL.yyyy")}
                />

                <ListRow name="Email:" value={email} />

                <ListRow name="Address:" value={address} />

                {gender && <ListRow name="Gender" value={gender} />}
              </ListHead>

              <ListHead name="Contacts" tabIndex={CONTACTS_TAB_INDEX}>
                {phones[0] &&
                  phones.map((phone, index) => (
                    <ListRow
                      name={`Phone#${index + 1}:`}
                      value={phone}
                      key={index}
                    />
                  ))}

                <ListRow name="Fax:" value={fax} />

                {company && <ListRow name="Company:" value={company} />}

                <ListRowLink name="Github link:" link={gitHubLink} />

                <ListRowLink name="Facebook link:" link={facebookLink} />

                <ListRow name="Main language:" value={mainLanguage} />
              </ListHead>

              <ListHead name="Capabilities" tabIndex={CAPABILITIES_TAB_INDEX}>
                <ListRow
                  name="Skills:"
                  value={String(skills.map(skill => " " + skill))}
                />

                {additionalInformation && (
                  <Grid
                    className={classes.container}
                    justify="space-between"
                    direction="row"
                    container
                    xs={12}
                    item
                  >
                    <Grid item xs={6}>
                      <span> Additional information: </span>
                    </Grid>

                    <Grid item xs={6}>
                      <pre
                        className={`${classes.headers} ${classes.additionalInfo}`}
                      >
                        {additionalInformation}
                      </pre>
                    </Grid>
                  </Grid>
                )}

                {hobbies.length > 0 &&
                  hobbies
                    .filter(hobbie => hobbie !== undefined)
                    .map((hobbie, index) => (
                      <HobbiesRow
                        name={index === 0 ? "Hobbies:" : null}
                        value={hobbie}
                        key={index}
                      />
                    ))}
              </ListHead>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  mainContainer: {
    filter: props => (props.isLoading ? "blur(4px)" : "none")
  },

  container: {
    marginBottom: "10px"
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
    marginBottom: "10px"
  },

  hobbies: {
    color: "#657C9A"
  },

  headers: {
    color: "#475666",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  },

  additionalInfo: {
    margin: 0,
    color: "#657C9A"
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
  { updateUser, getUserFromList }
)(UserView);
