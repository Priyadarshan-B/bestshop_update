import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// Define the theme
const theme = createTheme({
    palette: {
        mode: "light", // Initially set to light mode
    },
});

const lightModeProperties = {
    "--background": "rgb(201, 223, 226)",
    "--background-1": "#ffffff",
    "--button": "#178a84",
    "--text": "#00000a",
    "--gray-text": "rgb(79, 79, 79)",
    "--button-hover":"#178a84c2",
    "--button-hover-1": "rgb(182, 224, 229)",
    "--card-hover": "#f3f9f9",
    "--light-hover": "#c8dddf",
    "--menu-hover":"#21bdb5",
    "--card":"#fff", 
    "--white":"#fff"
};

const darkModeProperties = {
    "--background": "#222831",
    "--background-1": "#31363F",
    "--button": "#178a84",
    "--text": "#e6e6e6",
    "--gray-text": "rgb(255, 255, 255)",
    "--button-hover": "#262c34",
    "--card-hover": "#28393a",
    "--light-hover": "#c8dddf",
    "--menu-hover":"#222831",
    "--card":"#31363F",
    "--white":"#fff"

};

// Set custom properties based on theme mode
const setCustomProperties = (mode) => {
    const root = document.documentElement;
    root.style.cssText = Object.entries(
        mode === "dark" ? darkModeProperties : lightModeProperties
    )
        .map(([key, value]) => `${key}:${value};`)
        .join("");
};

// Styled switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 32,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 0,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 30 20"><path fill="${encodeURIComponent(
                    theme.palette.mode === "dark" ? "#f5f3f7" : "#FFFFFF"
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "var(--button)", // Use the custom property
        width: 32,
        height: 32,
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                theme.palette.mode === "dark" ? "#fff" : "#FFF"
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        borderRadius: 20 / 2,
    },
}));

export default function CustomizedSwitches() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if the user has a preference for theme stored in local storage
        const preferredTheme = localStorage.getItem("preferredTheme");
        if (preferredTheme) {
            setDarkMode(preferredTheme === "dark");
            setCustomProperties(preferredTheme);
        }
        // If not, set initial mode to light and update custom properties
        else {
            setCustomProperties("light");
        }
    }, []); // Run only on initial render

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        const mode = newMode ? "dark" : "light";
        setCustomProperties(mode); // Update custom properties based on theme mode
        localStorage.setItem("preferredTheme", mode); // Store user preference for theme
    };

    return (
        <ThemeProvider theme={theme}>
            <FormGroup>
                <FormControlLabel
                    style={{ margin: 0 }}
                    control={
                        <MaterialUISwitch checked={darkMode} onChange={toggleDarkMode} />
                    }
                />
            </FormGroup>
        </ThemeProvider>
    );
}