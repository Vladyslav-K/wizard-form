import React, { memo } from "react";

import { ReactComponent as Plus } from "../../images/icons/add.svg";
import DefaultAvatarImage from "../../images/icons/avatar.svg";
import InputError from "../InputError";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",

    marginTop: "16px"
  },

  defaultAvatar: {
    width: "171px",
    height: "172px",

    border: "3px solid #5E97F3",

    "& img": {
      height: "90%",
      width: "auto",

      transform: "translateY(10px)"
    }
  },

  userAvatar: {
    width: "171px",
    height: "172px",

    border: "3px solid #5E97F3"
  },

  input: {
    display: "none"
  },

  button: {
    color: "#9BB0CB",
    textTransform: "none"
  }
}));

function AccountLeftContent({
  avatar,
  handleImageChange,
  avatarSizeValidation
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {avatar ? (
        <Avatar src={avatar} alt="User avatar" className={classes.userAvatar} />
      ) : (
        <Avatar
          src={DefaultAvatarImage}
          alt="Default avatar image"
          className={classes.defaultAvatar}
        />
      )}

      {!avatarSizeValidation && <InputError value="Maximum image size 1 mb" />}

      <input
        accept="image/*"
        className={classes.input}
        id="text-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="text-button-file">
        <Button
          className={classes.button}
          startIcon={<Plus />}
          component="span"
          disableRipple
        >
          add avatar
        </Button>
      </label>
    </div>
  );
}

export default memo(AccountLeftContent);
