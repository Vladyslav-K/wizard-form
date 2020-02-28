import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getTestUsers,
  updateUserListFromDB,
  removeUserFromList
} from "../domain/userListDomain/userListActions.js";

import { createTestUserList } from "../utils/helpers.js";

import { AvatarForUserList } from "../components/AvatarForUserList.jsx";

import { ReactComponent as DeleteIcon } from "../images/icons/Close.svg";
import { ReactComponent as EditIcon } from "../images/icons/Edit.svg";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Container,
  Paper,
  Grid,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Table,
  CircularProgress
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";

const ConnectedListOfUsers = ({
  getTestUsers,
  updateUserListFromDB,
  removeUserFromList,
  isLoading,
  userList,
  total
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

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Grid container justify="center" className={classes.circularContainer}>
          <CircularProgress className={classes.circular} size="8%" />
        </Grid>
      ) : (
        <>
          <Grid className={classes.heading} container justify="center">
            List of Users
          </Grid>

          {userList.length === 0 ? (
            <>
              <TableContainer
                className={classes.tableContainer}
                component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">name </StyledTableCell>
                      <StyledTableCell align="left">company</StyledTableCell>
                      <StyledTableCell align="left">contacts</StyledTableCell>
                      <StyledTableCell align="left">
                        last update
                      </StyledTableCell>
                      <StyledTableCell align="left"> </StyledTableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>

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
            </>
          ) : (
            <>
              <TableContainer
                className={classes.tableContainer}
                component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">name </StyledTableCell>
                      <StyledTableCell align="left">company</StyledTableCell>
                      <StyledTableCell align="left">contacts</StyledTableCell>
                      <StyledTableCell align="left">
                        last update
                      </StyledTableCell>
                      <StyledTableCell align="left"> </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList.map(user => (
                      <StyledTableRow key={user.id}>
                        <StyledTableCell align="left">
                          <AvatarForUserList
                            firstName={user.firstName}
                            lastName={user.lastName}
                            username={user.username}
                            avatar={user.avatar}
                            id={user.id}
                          />
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          {user.company}
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          {user.phones[0] || user.email}
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          {DateTime.fromJSDate(user.updatedAt).toRelative()}
                        </StyledTableCell>

                        <ButtonCell>
                          <IconButton
                            component={Link}
                            to={`/users/edit/${user.id}`}>
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            onClick={() => removeUserFromList({ id: user.id })}>
                            <DeleteIcon />
                          </IconButton>
                        </ButtonCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

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
  tableContainer: {
    boxShadow: "none"
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
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",

    backgroundColor: "#4E86E4",
    color: "#FFFFFF",

    height: "45px",
    minWidth: "150px",

    borderBottom: "30px solid white",

    "&:last-of-type": {
      minWidth: 0
    }
  },

  body: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",

    color: "#475666",

    height: "93px"
  }
}))(TableCell);

const ButtonCell = withStyles(theme => ({
  body: {
    display: "flex",
    flexDirection: "row"
  }
}))(StyledTableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#E7F0FF"
    }
  }
}))(TableRow);

export const ListOfUsers = connect(
  ({ listOfUsers: { isLoading, userList, total } }) => ({
    isLoading,
    userList,
    total
  }),
  {
    getTestUsers,
    updateUserListFromDB,
    removeUserFromList
  }
)(ConnectedListOfUsers);
