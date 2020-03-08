import React, { memo, useMemo, useEffect, useState, useRef } from "react";

// parse and throttle functions
import parse from "autosuggest-highlight/parse";
import throttle from "lodash.throttle";

import { InputError } from "./InputError";

// styles
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Autocomplete from "@material-ui/lab/Autocomplete";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export const InputGooglePlacesAutocomplete = memo(
  ({ placeholder, required, errors, field, label, form, handleBlur }) => {
    const classes = useStyles();

    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);

    if (typeof window !== "undefined" && !loaded.current) {
      if (!document.querySelector("#google-maps")) {
        loadScript(
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQW3QCxUsbCPT-gSm9BFhwO0Isoxy4jvk&libraries=places",
          document.querySelector("head"),
          "google-maps"
        );
      }

      loaded.current = true;
    }

    const handleChange = event => {
      setInputValue(event.target.value);
    };

    const fetch = useMemo(
      () =>
        throttle((input, callback) => {
          autocompleteService.current.getPlacePredictions(input, callback);
        }, 400),
      []
    );

    useEffect(() => {
      let active = true;

      if (!autocompleteService.current && window.google) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
      }
      if (!autocompleteService.current) {
        return undefined;
      }

      if (inputValue === "") {
        setOptions([]);
        return undefined;
      }

      fetch({ input: inputValue }, results => {
        if (active) {
          setOptions(results || []);
        }
      });

      return () => {
        active = false;
      };
    }, [inputValue, fetch]);

    return (
      <Autocomplete
        getOptionLabel={option =>
          typeof option === "string" ? option : option.description
        }
        onChange={(event, value) => {
          form.setFieldValue(field.name, value && value.description);

          handleBlur({ [field.name]: value && value.description });
        }}
        filterOptions={x => x}
        id="google-map-places"
        value={field.value}
        disableOpenOnFocus
        includeInputInList
        options={options}
        autoComplete
        size="small"
        freeSolo
        renderInput={params => (
          <Grid container className={classes.fieldContainer}>
            <Grid container justify="space-between">
              <label htmlFor={field.name}> {label} </label>

              {required && <label> * </label>}
            </Grid>

            <TextField
              className={classes.fieldStyles}
              placeholder={placeholder}
              onChange={handleChange}
              variant="outlined"
              name={field.name}
              id={field.name}
              {...params}
              fullWidth
              multiline
            />

            {errors && <InputError value={errors} />}
          </Grid>
        )}
        renderOption={option => {
          const matches =
            option.structured_formatting.main_text_matched_substrings;

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map(match => [match.offset, match.offset + match.length])
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>

              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index}>{part.text}</span>
                ))}

                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    );
  }
);

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  },

  fieldContainer: {
    marginBottom: "3rem",
    marginTop: "16px"
  },

  fieldStyles: {
    marginBottom: "8px",

    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px"
  },

  optionsList: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    lineHeight: "16px",
    fontWeight: "500",
    fontSize: "14px"
  }
}));
