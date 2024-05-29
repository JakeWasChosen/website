import React, {useContext, useMemo} from 'react';
import {ColorContext} from '../App';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {complement, harmony} from 'simpler-color'
import {getContrastingColor} from "react-color/lib/helpers/color.js";

function DynamicThemeProvider({children}) {
    const {color} = useContext(ColorContext);
    const theme = useMemo(() => {
                const scheme = harmony(color)
                const text = getContrastingColor(color)
                Object.keys(scheme).forEach((prop) => console.log("%c" + prop + " " + scheme[prop], `background: ${scheme[prop]};`));
                return createTheme({
                    palette: {
                        contrastThreshold: 4.5,
                        primary: {
                            main: scheme.primary,
                        },
                        secondary: {
                            main: complement(scheme.primary, 2),
                            // ... other variants as needed
                        },
                        accent: {
                            main: scheme.accent
                        },
                        error: {
                            main: scheme.error,
                        },
                        text: {
                            primary: text,
                        },
                        // Add other color palettes like error, warning, etc. if needed
                    },
                    // Customize typography, spacing, etc. as per your design
                }); // Return the modified theme
            },
            [color]
        )
    ;

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default DynamicThemeProvider;
