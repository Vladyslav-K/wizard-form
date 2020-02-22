import React, { memo } from "react";

import { ReactComponent as CheckboxRectangle } from "../images/icons/checkbox_rectangle.svg";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

export const CheckBox = memo(({ field, form, fieldName, label, options }) => {
  return (
    <>
      <span style={{ margin: "1rem 0" }}>{label}</span>

      <div id="checkbox-group">
        {options.map((item, index) => (
          <FormControlLabel
            onChange={(event, checked) =>
              form.setFieldValue(`${fieldName}.${index}`, checked ? item : null)
            }
            control={
              <MuiCheckbox
                checked={field.value && field.value.includes(item)}
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckboxRectangle fontSize="small" />}
              />
            }
            label={item}
            key={index}
          />
        ))}
      </div>
    </>
  );
});
