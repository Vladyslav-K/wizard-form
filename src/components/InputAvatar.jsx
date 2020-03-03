import React, { memo, useState } from "react";

import { ReactComponent as Plus } from "../images/icons/add.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";
import { InputError } from "./InputError";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button } from "@material-ui/core";

export const InputAvatar = memo(({ field, form, errors }) => {
  const classes = useStyles();

  const [imageError, setImageError] = useState(false);

  const handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();

    const file = event.target.files[0];

    reader.onload = () => {
      if (file.size < 1000000) {
        form.setFieldValue(field.name, reader.result);
        setImageError(false);
      } else {
        setImageError(true);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.container}>
      {field.value ? (
        <label htmlFor="text-button-file">
          <Avatar
            className={classes.userAvatar}
            alt="User avatar"
            src={field.value}
          />
        </label>
      ) : (
        <label htmlFor="text-button-file">
          <Avatar
            className={classes.defaultAvatar}
            alt="Default avatar image"
            src={DefaultAvatarImage}
          />
        </label>
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
          component="span">
          add avatar
        </Button>
      </label>

      {(imageError || errors) && <InputError value="Maximum image size 1 mb" />}
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
