import React, { memo } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

import { ReactComponent as ConfirmDeleteIcon } from "../images/icons/Close_confirm.svg";
import { ReactComponent as DeleteIcon } from "../images/icons/Close.svg";
import { ReactComponent as EditIcon } from "../images/icons/Edit.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Avatar, Grid } from "@material-ui/core";

export const ListItem = memo(
  ({
    setShiftedComponent,
    removeUserFromList,
    shiftedComponent,
    onShiftComponent,
    onLinkClick,
    user
  }) => {
    const classes = useStyles();

    const {
      updatedAt,
      firstName,
      lastName,
      username,
      company,
      phones,
      avatar,
      email,
      id
    } = user;

    return (
      <Grid
        className={`${classes.tableBodyRow} ${id === shiftedComponent &&
          classes.transformContainer}`}
        direction="row"
        container>
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
          onClick={() => onLinkClick(id)}>
          <span> {`${firstName} ${lastName}`} </span>

          <span className={classes.usernameStyles}>{username}</span>
        </Grid>

        <Grid item xs={2}>
          <span> {company} </span>
        </Grid>

        <Grid item xs={3}>
          <span> {phones[0] || email} </span>
        </Grid>

        <Grid item xs={2}>
          <span>
            {updatedAt && DateTime.fromMillis(updatedAt).toRelative()}
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
            onClick={event => onShiftComponent(event, id)}
            className={classes.iconButton}>
            <DeleteIcon />
          </IconButton>
        </Grid>

        <Grid
          item
          xs={1}
          className={
            id === shiftedComponent ? classes.confirmButton : classes.hidden
          }>
          <IconButton onClick={() => removeUserFromList({ id })}>
            <ConfirmDeleteIcon />
            <span> delete </span>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
);

const useStyles = makeStyles(theme => ({
  confirmButton: {
    display: "flex !important",
    transform: "translateX(100px)",

    "& button": {
      fontSize: "14px",
      color: "#FF8989"
    }
  },

  hidden: {
    display: "none"
  },

  transformContainer: {
    overflow: "visible !important",
    transform: "translateX(-100px)",
    transitionDuration: ".3s",

    "& div:not(:last-child)": {
      opacity: ".5",

      "& button": {
        display: "none"
      }
    },

    "& a": {
      display: "none"
    },

    "& div:last-child": {
      display: "flex",
      opacity: 1
    }
  },

  tableBodyRow: {
    overflow: "hidden",
    flexWrap: "nowrap",
    transitionDuration: ".3s",
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

  iconButton: {
    padding: "7px"
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
