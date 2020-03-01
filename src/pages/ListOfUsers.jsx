import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  searchUsersByName,
  getTestUsers,
  updateUserListFromDB,
  removeUserFromList
} from "../domain/userListDomain/userListActions.js";

import { createTestUserList } from "../utils/helpers.js";

import { ReactComponent as DeleteIcon } from "../images/icons/Close.svg";
import { ReactComponent as EditIcon } from "../images/icons/Edit.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";

import { SearchField } from "../components/SearchField.jsx";

import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  IconButton,
  Container,
  Avatar,
  Grid
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";

const ConnectedListOfUsers = ({
  searchUsersByName,
  getTestUsers,
  updateUserListFromDB,
  removeUserFromList,
  isLoading,
  userList,
  total,

  history
}) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(1);

  useEffect(() => {
    updateUserListFromDB({ pageNumber: page, pageSize: 10 });
  }, [updateUserListFromDB, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const createTestUsers = () => {
    const testUserList = createTestUserList();

    getTestUsers(testUserList);

    updateUserListFromDB({ pageNumber: 1, pageSize: 10 });
  };

  const searchHandleChange = event => {
    searchUsersByName(event.target.value);
  };

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Grid container justify="center" className={classes.circularContainer}>
          <CircularProgress className={classes.circular} size="8%" />
        </Grid>
      ) : (
        <>
          <Grid className={classes.heading} container justify="center">
            <span>List of Users</span>
          </Grid>

          <Grid container item xs={3}>
            <SearchField handleChange={searchHandleChange} />
          </Grid>

          <Grid
            className={classes.tableHeadRow}
            justify="center"
            direction="row"
            container>
            <Grid item xs />

            <Grid item xs={3}>
              <span>name</span>
            </Grid>

            <Grid item xs={2}>
              <span>company</span>
            </Grid>

            <Grid item xs={3}>
              <span>contacts</span>
            </Grid>

            <Grid item xs={2}>
              <span>last update</span>
            </Grid>

            <Grid item xs={1} />
          </Grid>

          {userList.length === 0 ? (
            <Container className={classes.heading} maxWidth="md">
              <Grid container direction="column" justify="center">
                <Grid item className={classes.noUsersHeading}>
                  No users here :(
                </Grid>

                <Grid item>
                  <div className={classes.buttonContainer}>
                    <Link to="/registration">
                      <button className={classes.button} type="submit">
                        Create new user
                      </button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <>
              <Grid container direction="column">
                {userList.map(
                  ({
                    updatedAt,
                    firstName,
                    lastName,
                    username,
                    company,
                    phones,
                    avatar,
                    email,
                    id
                  }) => (
                    <Grid
                      className={classes.tableBodyRow}
                      direction="row"
                      container
                      key={`${username}-${id}`}>
                      <Grid container justify="center" item xs={1}>
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
                        style={{ cursor: "pointer" }}
                        direction="column"
                        container
                        item
                        xs={3}
                        onClick={() =>
                          history.push({ pathname: `/users/view/${id}` })
                        }>
                        <span> {`${firstName} ${lastName}`} </span>

                        <span className={classes.usernameStyles}>username</span>
                      </Grid>

                      <Grid item xs={2}>
                        <span> {company} </span>
                      </Grid>

                      <Grid item xs={3}>
                        <span> {phones[0] || email} </span>
                      </Grid>

                      <Grid item xs={2}>
                        <span>
                          {updatedAt &&
                            DateTime.fromMillis(updatedAt).toRelative()}
                        </span>
                      </Grid>

                      <Grid item xs={1}>
                        <IconButton
                          component={Link}
                          to={`/users/edit/${id}`}
                          className={classes.iconButton}>
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => removeUserFromList({ id })}
                          className={classes.iconButton}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  )
                )}
              </Grid>

              <Grid container justify="center" style={{ margin: "2rem 0" }}>
                <Pagination
                  className={classes.pagination}
                  count={Math.ceil(total / 10)}
                  onChange={handleChange}
                  page={page}
                />
              </Grid>
            </>
          )}

          <Grid container justify="center">
            <div className={classes.testButton}>
              <button className={classes.button} onClick={createTestUsers}>
                Create 20 test users
              </button>
            </div>
          </Grid>
        </>
      )}
    </Container>
  );
};

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: "970px",
    marginLeft: "auto",
    marginRight: "auto"
  },

  tableBodyRow: {
    alignItems: "center",

    color: "#475666",
    height: "93px",
    fontSize: "14px",
    fontStyle: "normal",
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: "16px",

    "&:nth-of-type(odd)": {
      backgroundColor: "#E7F0FF"
    }
  },

  tableHeadRow: {
    backgroundColor: "#4E86E4",
    color: "#FFFFFF",
    fontFamily: "Roboto",

    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px",

    padding: "15px 0",
    marginBottom: "29px"
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

  usernameStyles: {
    lineHeight: "11px",
    fontSize: "9px"
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",

    marginTop: "10vh"
  },

  button: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    textTransform: "none",

    color: "white",
    background: "#4E86E4",

    width: "200px",
    height: "50px",

    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  },

  testButton: {
    marginBottom: "1rem"
  },

  iconButton: {
    padding: "7px"
  },

  noUsersHeading: {
    textAlign: "center",
    color: "#9BB0CB"
  },

  circularContainer: {
    marginTop: "35vh"
  },

  circular: {
    color: "#4E86E4"
  },

  pagination: {
    "& button": {
      fontFamily: "Roboto",
      color: "#475666"
    }
  },

  defaultAvatar: {
    width: "40px",
    height: "40px",

    textAlign: "center",
    border: "2px solid #5E97F3",

    "& img": {
      width: "auto",

      transform: "translateY(5px)"
    }
  },

  userAvatar: {
    height: "40px",
    width: "40px",

    textAlign: "center",

    "& img": {
      width: "auto"
    }
  }
}));

export const ListOfUsers = connect(
  ({ listOfUsers: { isLoading, userList, total } }) => ({
    isLoading,
    userList,
    total
  }),
  {
    searchUsersByName,
    getTestUsers,
    updateUserListFromDB,
    removeUserFromList
  }
)(ConnectedListOfUsers);
