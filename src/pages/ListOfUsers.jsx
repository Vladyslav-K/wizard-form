import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// store user list actions
import {
  deleteUserFromList,
  searchUsersByName,
  getTestUsers,
  setLoading,
  updateUser
} from "../store/userListModule.js";

// helpers functions
import {
  calculatePaginationCount,
  getQueryStringValue,
  createTestUserList,
  setQueryString
} from "../utils/helpers.js";

// separate components
import { UserListItem } from "../components/UserListItem.jsx";
import { SearchField } from "../components/SearchField.jsx";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const ListOfUsers = ({
  deleteUserFromList,
  searchUsersByName,
  getTestUsers,
  updateUser,
  setLoading,
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
    setLoading(true);

    const queryPage = getQueryStringValue({
      queryName: "page",
      location: location.search
    });

    const queryFilter = getQueryStringValue({
      queryName: "filter",
      location: location.search
    });

    checkQueryStringPageAndFilter({ queryPage, queryFilter });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keydownListener);

    return () => document.removeEventListener("keydown", keydownListener);
  }, []);

  const checkQueryStringPageAndFilter = ({ queryPage, queryFilter }) => {
    if (!queryPage && !queryFilter) {
      setQueryString({ queryName: "page", queryValue: 1 });
      updateUser({ pageNumber: 1, pageSize: 10 });
    }

    if (queryFilter && queryPage) {
      setPage(+queryPage);

      setSearchValue(queryFilter);

      searchUsersByName({
        keywords: queryFilter,
        pageNumber: queryPage,
        pageSize: 10
      });
    }

    if (queryPage && !queryFilter) {
      setPage(+queryPage);
      updateUser({ pageNumber: +queryPage, pageSize: 10 });
    }
  };

  const keydownListener = event => {
    if (event.keyCode === 27) {
      setShiftedComponent(0);
    }
  };

  const handleChange = (event, value) => {
    const pageNumber = +value;

    setPage(pageNumber);

    setQueryString({
      queryName: "page",
      queryValue: pageNumber,
      additionalName: "filter",
      additionalValue: searchValue
    });

    searchValue
      ? searchUsersByName({
          keywords: searchValue,
          pageNumber: pageNumber,
          pageSize: 10
        })
      : updateUser({ pageNumber: pageNumber, pageSize: 10 });
  };

  const createTestUsers = () => {
    const testUserList = createTestUserList();

    getTestUsers(testUserList);

    setSearchValue("");

    updateUser({ pageNumber: 1, pageSize: 10 });

    setQueryString({
      queryName: "page",
      queryValue: 1
    });

    setPage(1);
  };

  const searchHandleChange = event => {
    const keywords = event.target.value;

    setPage(1);

    setSearchValue(keywords);

    searchUsersByName({ keywords, pageNumber: 1, pageSize: 10 });

    setQueryString({
      queryName: "page",
      queryValue: 1,

      additionalName: "filter",
      additionalValue: keywords
    });
  };

  const onShiftComponent = id => {
    setShiftedComponent(id);
  };

  const onLinkClick = id => {
    history.push({ pathname: `/users/view/${id}` });
  };

  const deleteUser = ({ id }) => {
    if (userList.length === 1 && page > 1) {
      setLoading(true);

      deleteUserFromList({
        pageNumber: page - 1,
        pageSize: 10,
        searchValue,
        id
      });

      setQueryString({
        queryName: "page",
        queryValue: page - 1,

        additionalName: "filter",
        additionalValue: searchValue
      });

      setPage(page - 1);
    } else {
      deleteUserFromList({ pageNumber: page, pageSize: 10, searchValue, id });
    }
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
              {userList.map((user, index) => (
                <UserListItem
                  shiftedComponent={shiftedComponent}
                  onShiftComponent={onShiftComponent}
                  onLinkClick={onLinkClick}
                  key={user.id && user.id}
                  deleteUser={deleteUser}
                  user={user}
                />
              ))}
            </Grid>

            {calculatePaginationCount(total) > 1 && (
              <Grid container justify="center" style={{ margin: "2rem 0" }}>
                <Pagination
                  count={calculatePaginationCount(total)}
                  className={classes.pagination}
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
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    color: "#FFFFFF",
    fontSize: "14px",

    marginBottom: "29px",
    padding: "15px 0"
  },

  heading: {
    paddingBottom: "2rem",
    paddingTop: "3rem",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: "41px",
    color: "#475666",
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
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px",

    textTransform: "none",

    background: "#4E86E4",
    color: "white",

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

export default connect(
  state => ({
    isLoading: state.listOfUsers.isLoading,
    userList: state.listOfUsers.userList,
    total: state.listOfUsers.total
  }),
  {
    deleteUserFromList,
    searchUsersByName,
    getTestUsers,
    updateUser,
    setLoading
  }
)(ListOfUsers);
