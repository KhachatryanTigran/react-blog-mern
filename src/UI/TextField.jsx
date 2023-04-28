import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function MultilineTextFields({ value, onChange }) {
  return (
    <Box
      component="form"
      sx={{ width: "100%", "& .MuiTextField-root": { m: 1, width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Write comments"
          multiline
          maxRows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </Box>
  );
}
