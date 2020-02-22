import React from "react";
import { DateTime } from "luxon";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { removeUserFromList } from "../domain/userListDomain/userListActions.js";
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
  Table
} from "@material-ui/core";

const ConnectedListOfUsers = ({ userList, removeUserFromList }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid className={classes.heading} container justify="center">
        List of Users
      </Grid>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">name </StyledTableCell>
              <StyledTableCell align="left">company</StyledTableCell>
              <StyledTableCell align="left">contacts</StyledTableCell>
              <StyledTableCell align="left">last update</StyledTableCell>
              <StyledTableCell align="left"> </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userList.map(user => (
              <StyledTableRow key={user.username}>
                <StyledTableCell align="left">
                  <AvatarForUserList
                    firstName={user.firstName}
                    lastName={user.lastName}
                    username={user.username}
                    avatar={user.avatar}
                  />
                </StyledTableCell>

                <StyledTableCell align="left">{user.company}</StyledTableCell>

                <StyledTableCell align="left">
                  {user.phones[0] || user.email}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {DateTime.fromJSDate(user.updatedAt).toRelative()}
                </StyledTableCell>

                <StyledTableCell align="left">
                  <IconButton>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => removeUserFromList({ id: user.id })}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {userList.length === 0 && (
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

    padding: "12px 24px",

    border: "none",

    "&:hover": {
      opacity: 0.9
    }
  },

  noUsersHeading: {
    textAlign: "center",
    color: "#9BB0CB"
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

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#E7F0FF"
    }
  }
}))(TableRow);

export const ListOfUsers = connect(
  ({ listOfUsers: { userList } }) => ({ userList }),
  {
    removeUserFromList
  }
)(ConnectedListOfUsers);
