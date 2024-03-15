import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const InputBox = ({ label, onChange, type, min, value, id, size }) => {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        gridTemplateColumns: { sm: "1fr 1fr" },
        gap: 2,
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
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default InputBox;
