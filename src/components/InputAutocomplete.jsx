import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  fieldContainer: {
    marginTop: "16px",
    marginBottom: "3rem"
  },

  fieldStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px"
  }
}));

const language = [
  "English",
  "French",
  "Spanish",
  "Arabic",
  "Mandarin",
  "Russian",
  "Portuguese",
  "German",
  "Japanese",
  "Hindi",
  "Malay",
  "Persian",
  "Swahili",
  "Tamil",
  "Italian",
  "Dutch",
  "Bengali",
  "Turkish",
  "Vietnamese",
  "Polish",
  "Javanese",
  "Punjabi",
  "Thai",
  "Korean"
];

const InputAutocomplete = ({ field, form }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      onInputChange={(e, value) => form.setFieldValue(field.name, value)}
      options={language}
      disableClearable
      size="small"
      freeSolo
      renderInput={params => (
        <Grid container className={classes.fieldContainer}>
          <Grid container justify="space-between">
            <span> Main language </span>
            <span> * </span>
          </Grid>

          <TextField
            className={classes.fieldStyles}
            value={field.value}
            variant="outlined"
            {...params}
            fullWidth
          />
        </Grid>
      )}
    />
  );
};

export default memo(InputAutocomplete);
