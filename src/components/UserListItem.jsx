import React, { memo } from "react";
import { Link } from "react-router-dom";

import OutsideClickHandler from "react-outside-click-handler";
import { DateTime } from "luxon";

// icons for buttons and default avatar image
import { ReactComponent as ConfirmDeleteIcon } from "../images/icons/Close_confirm.svg";
import { ReactComponent as DeleteIcon } from "../images/icons/Close.svg";
import { ReactComponent as EditIcon } from "../images/icons/Edit.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Avatar, Grid } from "@material-ui/core";

export const UserListItem = memo(
  ({ shiftedComponent, onShiftComponent, onLinkClick, deleteUser, user }) => {
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
      <OutsideClickHandler onOutsideClick={() => onShiftComponent(0)}>
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
              onClick={() => onShiftComponent(id)}
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
            <IconButton onClick={() => deleteUser({ id })}>
              <ConfirmDeleteIcon />
              <span> delete </span>
            </IconButton>
          </Grid>
        </Grid>
      </OutsideClickHandler>
    );
  }
);

const useStyles = makeStyles(theme => ({
  confirmButton: {
    display: "flex !important",
    transform: "translateX(90px)",

    "& button": {
      borderRadius: "10%",
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
    transitionDuration: ".3s",
    alignItems: "center",
    overflow: "hidden",
    flexWrap: "nowrap",

    height: "93px",

    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px",
    color: "#475666",

    "&:nth-of-type(odd)": {
      backgroundColor: "#E7F0FF"
    }
  },

  usernameStyles: {
    lineHeight: "11px",
    fontSize: "9px"
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
