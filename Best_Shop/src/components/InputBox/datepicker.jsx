import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomDatePicker = ({ label, value, onChange, size, sx }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        size={size}
        sx={{
          width: "100%",
          "& .MuiInputLabel-root": {
            color: "var(--text)",
          },
          "& .MuiInputBase-root": {
            color: "var(--text)",
          },
          "& .MuiInputBase-root": {
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
          "& .MuiInputBase-input": {
            borderBottom: "2px solid var(--button)", // Change border color
          },
          "& .MuiInputBase-input::placeholder": {
            color: "var(--text)", // Change placeholder color
          },
          ...sx, // Allow further customization through sx prop
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
