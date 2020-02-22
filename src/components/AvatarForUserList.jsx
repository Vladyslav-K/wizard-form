import React, { memo } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { CardHeader, Card, Avatar } from "@material-ui/core";

export const AvatarForUserList = memo(
  ({ avatar, username, firstName, lastName }) => {
    const classes = useStyles();

    return (
      <Card className={classes.cardContainer}>
        <StyledCard
          avatar={<Avatar size="large" alt="User avatar" src={avatar} />}
          title={`${firstName} ${lastName}`}
          subheader={username}
        />
      </Card>
    );
  }
);

const useStyles = makeStyles(theme => ({
  cardContainer: {
    borderRadius: "none",
    boxShadow: "none",
    background: "none"
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
