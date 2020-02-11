import React, { memo } from "react";
import { Formik } from "formik";

import InputError from "../InputError";
import InputField from "../InputField";
import StyledForm from "../StyledForm";

import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  fieldContainer: {
    marginTop: "16px",
    marginBottom: "8px"
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

const ContactsLeftContent = ({
  company,
  gitHubLink,
  facebookLink,
  mainLanguage,
  setCompany,
  setGitHubLink,
  setFacebookLink,
  setMainLanguage
}) => {
  const classes = useStyles();

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          company,
          gitHubLink,
          facebookLink,
          mainLanguage
        }}
      >
        {({ errors }) => (
          <StyledForm>
            <InputField
              name="company"
              label="Company"
              value={company}
              onChange={event => setCompany(event.target.value)}
            />

            {errors.company && <InputError value={errors.company} />}

            <InputField
              required
              name="gitHubLink"
              label="GitHub link"
              value={gitHubLink}
              onChange={event => setGitHubLink(event.target.value)}
            />

            {errors.gitHubLink && <InputError value={errors.gitHubLink} />}

            <InputField
              required
              name="facebookLink"
              label="Facebook link"
              value={facebookLink}
              placeholder="www.facebook.com/hdfk_142_23lelf/"
              onChange={event => setFacebookLink(event.target.value)}
            />

            {errors.facebookLink && <InputError value={errors.facebookLink} />}

            <Autocomplete
              onInputChange={(event, value) => setMainLanguage(value)}
              options={language}
              disableClearable
              freeSolo
              renderInput={params => (
                <>
                  <Grid container className={classes.fieldContainer}>
                    <span> Main language </span>

                    <TextField
                      className={classes.fieldStyles}
                      value={mainLanguage}
                      variant="outlined"
                      size="small"
                      {...params}
                      fullWidth
                      InputProps={{ ...params.InputProps, type: "search" }}
                    />
                  </Grid>
                </>
              )}
            />
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default memo(ContactsLeftContent);
