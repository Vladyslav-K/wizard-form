import React, { memo } from "react";

export const InputError = memo(({ value }) => (
  <div style={{ color: "red" }}>{value}</div>
));
