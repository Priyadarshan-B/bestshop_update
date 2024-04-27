import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#178a84",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#178a84",
      border: "2px solid #178a84",
    },
    "&:hover fieldset": {
      borderColor: "#178a84",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#178a84",
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
  sx,
  accept
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
        accept={accept}
      />
    </Box>
  );
};

export default InputBox;