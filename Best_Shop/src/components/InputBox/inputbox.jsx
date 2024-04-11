import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--button)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--button)",
      border: "2px solid var(--button)",
    },
    "&:hover fieldset": {
      borderColor: "var(--button)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--button)",
    },
  },
  "& input": {
    color: "var(--text)",
  },
  "& .MuiInputLabel-root": {
    color: "grey", // Label color
  },
  "& .MuiInputBase-input::placeholder": {
    color: "grey", // Placeholder color
  },
});

const InputBox = ({
  label,
  onChange,
  type,
  min,
  value,
  id,
  size,
  helperText,
  sx
}) => {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        gridTemplateColumns: { sm: "1fr 1fr" },
        gap: 2,
        color:"var(--text)"
      }}
    >
      <CssTextField
        label={label}
        type={type}
        min={min}
        value={value}
        onChange={onChange}
        id={id}
        size={size}
        helperText={helperText}
        // sx={{ width: "100%" }}
        sx={sx}
      />
    </Box>
  );
};

export default InputBox;
