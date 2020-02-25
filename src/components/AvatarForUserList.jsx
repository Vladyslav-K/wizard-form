import React, { memo } from "react";
import { Link } from "react-router-dom";
import { createHashHistory } from "history";

import DefaultAvatarImage from "../images/icons/avatar.svg";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { CardHeader, Card, Avatar } from "@material-ui/core";

export const AvatarForUserList = memo(
  ({ avatar, username, firstName, lastName, id }) => {
    const classes = useStyles();

    const history = createHashHistory();

    const handleClick = () => {
      history.push({ pathname: `/users/view/${id}` });
    };

    return (
      <Card className={classes.cardContainer}>
        <StyledCard
          avatar={
            avatar ? (
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
            )
          }
          title={`${firstName} ${lastName}`}
          subheader={username}
          onClick={handleClick}
        />
      </Card>
    );
  }
);

const useStyles = makeStyles(theme => ({
  cardContainer: {
    borderRadius: "none",
    boxShadow: "none",
    background: "none",
    cursor: "pointer"
  },

  defaultAvatar: {
    width: "40px",
    height: "40px",

    border: "2px solid #5E97F3",

    "& img": {
      width: "auto",

      transform: "translateY(5px)"
    }
  },

  userAvatar: {
    height: "40px",
    width: "40px",

    "& img": {
      width: "auto"
    }
  }
}));

const StyledCard = withStyles(theme => ({
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",

    color: "#475666",

    marginLeft: "15px"
  },

  subheader: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "9px",
    lineHeight: "11px",

    color: "#475666",

    marginLeft: "15px",
    marginTop: "5px"
  }
}))(CardHeader);
