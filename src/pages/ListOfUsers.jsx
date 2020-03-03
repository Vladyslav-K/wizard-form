import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  searchUsersByName,
  getTestUsers,
  updateUserListFromDB,
  removeUserFromList,
  userListIsLoading
} from "../domain/userListDomain/userListActions.js";

import {
  getQueryStringValue,
  createTestUserList,
  setQueryString
} from "../utils/helpers.js";

import { SearchField } from "../components/SearchField.jsx";
import { ListItem } from "../components/ListItem.jsx";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Grid } from "@material-ui/core";

import { Pagination } from "@material-ui/lab";

const ConnectedListOfUsers = ({
  searchUsersByName,
  getTestUsers,
  updateUserListFromDB,
  removeUserFromList,
  userListIsLoading,
  isLoading,
  userList,
  total,

  history,
  location
}) => {
  const classes = useStyles({ isLoading });

  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");

  const [shiftedComponent, setShiftedComponent] = useState(undefined);

  useEffect(() => {
    userListIsLoading();

    const queryPage = getQueryStringValue({
      queryName: "page",
      location: location.search
    });

    const queryFilter = getQueryStringValue({
      queryName: "filter",
      location: location.search
    });

    if (!queryPage && !queryFilter) {
      setQueryString({ queryName: "page", queryValue: 1 });
      updateUserListFromDB({ pageNumber: 1, pageSize: 10 });
    }

    if (queryFilter && queryPage) {
      setSearchValue(queryFilter);

      searchUsersByName({
        keywords: queryFilter,
        pageNumber: queryPage,
        pageSize: 10
      });
    }

    if (queryPage && !queryFilter) {
      setPage(+queryPage);
      updateUserListFromDB({ pageNumber: +queryPage, pageSize: 10 });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keydownListener);

    return () => document.removeEventListener("keydown", keydownListener);
  }, []);

  const keydownListener = event => {
    if (event.keyCode === 27) {
      setShiftedComponent(0);
    }
  };

  const handleChange = (event, value) => {
    setQueryString({ queryName: "page", queryValue: +value });
    setPage(+value);
    updateUserListFromDB({ pageNumber: +value, pageSize: 10 });
  };

  const createTestUsers = () => {
    const testUserList = createTestUserList();

    getTestUsers(testUserList);

    updateUserListFromDB({ pageNumber: 1, pageSize: 10 });
  };

  const searchHandleChange = event => {
    const keywords = event.target.value;

    setSearchValue(keywords);

    searchUsersByName({
      pageNumber: page,
      pageSize: 10,
      keywords
    });

    history.push({
      search: keywords ? `?page=${page}&filter=${keywords}` : `?page=${page}`
    });
  };

  const onShiftComponent = (event, id) => {
    setShiftedComponent(id);
  };

  const onLinkClick = id => {
    history.push({ pathname: `/users/view/${id}` });
  };

  return (
    <>
      {isLoading && (
        <Grid container justify="center" className={classes.circularContainer}>
          <CircularProgress className={classes.circular} size="8%" />
        </Grid>
      )}

      <Container maxWidth="md" className={classes.mainContainer}>
        <Grid className={classes.heading} container justify="center">
          <span>List of Users</span>
        </Grid>

        <Grid container item xs={3}>
          <SearchField value={searchValue} handleChange={searchHandleChange} />
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

        {userList && userList.length === 0 && !isLoading ? (
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
              {userList.map(user => (
                <ListItem
                  setShiftedComponent={setShiftedComponent}
                  removeUserFromList={removeUserFromList}
                  shiftedComponent={shiftedComponent}
                  onShiftComponent={onShiftComponent}
                  onLinkClick={onLinkClick}
                  key={user.id}
                  user={user}
                />
              ))}
            </Grid>

            {Math.ceil(total / 10) > 1 && (
              <Grid container justify="center" style={{ margin: "2rem 0" }}>
                <Pagination
                  className={classes.pagination}
                  count={Math.ceil(total / 10)}
                  onChange={handleChange}
                  page={page}
                />
              </Grid>
            )}
          </>
        )}

        {!isLoading && (
          <Grid container justify="center">
            <div className={classes.testButton}>
              <button className={classes.button} onClick={createTestUsers}>
                Create 20 test users
              </button>
            </div>
          </Grid>
        )}
      </Container>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  mainContainer: {
    filter: props => (props.isLoading ? "blur(4px)" : "none")
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
    paddingTop: "3rem",
    paddingBottom: "2rem",

    color: "#475666",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "41px",
    fontSize: "35px"
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

  noUsersHeading: {
    textAlign: "center",
    color: "#9BB0CB"
  },

  circularContainer: {
    display: "block",
    position: "fixed",
    top: "55%",
    left: "50%"
  },

  circular: {
    color: "#4E86E4"
  },

  pagination: {
    "& button": {
      fontFamily: "Roboto",
      color: "#475666"
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
    removeUserFromList,
    userListIsLoading
  }
)(ConnectedListOfUsers);
