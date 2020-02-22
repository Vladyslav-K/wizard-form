import React, { memo } from "react";

import { ReactComponent as Plus } from "../images/icons/add.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";
import { InputError } from "./InputError";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button } from "@material-ui/core";

export const InputAvatar = memo(({ field, form, errors }) => {
  const classes = useStyles();

  const handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();

    const file = event.target.files[0];

    reader.onload = () => {
      form.setFieldValue(field.name, reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.container}>
      {field.value ? (
        <Avatar
          className={classes.userAvatar}
          alt="User avatar"
          src={field.value}
          onClick={handleImageChange}
        />
      ) : (
        <Avatar
          className={classes.defaultAvatar}
          alt="Default avatar image"
          src={DefaultAvatarImage}
          onClick={handleImageChange}
        />
      )}

      <input
        className={classes.input}
        id="text-button-file"
        accept="image/*"
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <label htmlFor="text-button-file">
        <Button
          className={classes.button}
          startIcon={<Plus />}
          component="span"
          disableRipple>
          add avatar
        </Button>
      </label>

      {errors && <InputError value="Maximum image size 1 mb" />}
    </div>
  );
});

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
