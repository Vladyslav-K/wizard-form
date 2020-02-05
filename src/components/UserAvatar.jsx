import React, { useState } from "react";

import { ReactComponent as Plus } from "../images/icons/add.svg";
import DefaultAvatar from "../images/icons/avatar.svg";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
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

export default function UserAvatar(props) {
  const classes = useStyles();

  const [avatar, setAvatar] = useState();

  const handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();

    const file = event.target.files[0];

    reader.onload = () => {
      console.log(reader.result);
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.container}>
      {avatar ? (
        <Avatar src={avatar} alt="User avatar" className={classes.userAvatar} />
      ) : (
        <Avatar
          src={DefaultAvatar}
          alt="Default avatar"
          className={classes.defaultAvatar}
        />
      )}

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
        >
          add avatar
        </Button>
      </label>
    </div>
  );
}
