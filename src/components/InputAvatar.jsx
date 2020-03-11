import React, { memo, useState } from "react";

// react-modal components
import ReactModal from "react-modal";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// constant image size for validation (1000000)
import { MAX_AVATAR_IMAGE_SIZE } from "../utils/constants.js";

// plus icon and default image for avatar
import { ReactComponent as Plus } from "../images/icons/add.svg";
import DefaultAvatarImage from "../images/icons/avatar.svg";

import { InputError } from "./InputError";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button } from "@material-ui/core";

export const InputAvatar = memo(({ field, form, errors, saveUser }) => {
  const classes = useStyles();

  const [imageError, setImageError] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [imageRef, setImageRef] = useState(null);

  const [src, setSrc] = useState(null);

  const [crop, setCrop] = useState({
    unit: "px",
    aspect: 1,
    width: 450,
    height: 450,
    y: 50,
    x: 300
  });

  ReactModal.setAppElement("#root");

  const onSelectFile = event => {
    if (event.target.files && event.target.files.length > 0) {
      event.preventDefault();

      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = () => {
        if (file.size < MAX_AVATAR_IMAGE_SIZE) {
          setSrc(reader.result);

          setImageError(false);

          openModal();
        } else {
          setImageError(true);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const onImageLoaded = image => {
    setImageRef(image);

    return false;
  };

  const onCropComplete = () => {
    makeClientCrop(crop);
    setModalIsOpen(false);
  };

  const onCropChange = crop => {
    setCrop(crop);
  };

  const makeClientCrop = async crop => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );

      saveUser({ [field.name]: croppedImageUrl });
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        const reader = new FileReader();

        reader.readAsDataURL(blob);

        reader.onload = () => {
          const croppedImage = reader.result;

          resolve(croppedImage);
        };
      });
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        onChange={onSelectFile}
      />

      <label htmlFor="text-button-file">
        <Button
          className={classes.button}
          startIcon={<Plus />}
          component="span">
          add avatar
        </Button>
      </label>

      <ReactModal
        contentLabel="Avatar Modal"
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        style={{
          overlay: {
            display: "flex",
            position: "fixed",
            alignItems: "center",
            justifyContent: "center",

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            backgroundColor: "rgba(255, 255, 255, 0.75)"
          },

          content: {
            display: "flex",
            position: "absolute",
            flexDirection: "column",

            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",

            WebkitOverflowScrolling: "touch",
            border: "1px solid #ccc",
            background: "#5E97F3",
            borderRadius: "4px",
            outline: "none",

            padding: "20px"
          }
        }}>
        <>
          <ReactCrop
            imageStyle={{ maxHeight: "500px", maxWidth: "1000px" }}
            onImageLoaded={onImageLoaded}
            onChange={onCropChange}
            ruleOfThirds
            circularCrop
            crop={crop}
            src={src}
          />

          <div className={classes.buttonContainer}>
            <button className={classes.cropButton} onClick={onCropComplete}>
              Save avatar
            </button>
          </div>
        </>
      </ReactModal>

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
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",

    marginTop: "1.5rem"
  },

  cropButton: {
    minWidth: "104px",
    padding: "12px 24px",

    border: "none",

    textTransform: "none",
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontSize: "14px",
    color: "#4E86E4",

    "&:hover": {
      opacity: 0.9
    }
  }
}));
