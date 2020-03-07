import React, { memo } from "react";

import { ReactComponent as CheckboxRectangle } from "../images/icons/checkbox_rectangle.svg";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

export const CheckBox = memo(({ field, form, label, options, pushHobbie }) => {
  const handleChange = (checked, hobbie) => {
    if (checked) {
      form.setFieldValue(field.name, hobbie);

      pushHobbie(hobbie);
    }
  };

  return (
    <>
      <span style={{ margin: "1rem 0" }}>{label}</span>

      <div id="checkbox-group">
        {options.map((hobbie, index) => (
          <FormControlLabel
            onChange={(event, checked) => handleChange(checked, hobbie)}
            control={
              <MuiCheckbox
                checked={field.value && field.value.includes(hobbie)}
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckboxRectangle fontSize="small" />}
              />
            }
            label={hobbie}
            key={index}
          />
        ))}
      </div>
    </>
  );
});
